#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// ─── Config & path detection (unchanged) ─────────────────────────────────────

function loadConfig() {
  const configPath = path.join(__dirname, 'typegen.config.json')
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      console.log('📋 Using configuration from typegen.config.json')
      return config
    } catch (error) {
      console.warn('⚠️  Warning: Could not parse typegen.config.json, using auto-detection')
    }
  }
  return null
}

function findProjectStructure() {
  const currentDir = __dirname
  const config = loadConfig()

  if (config) {
    const webPath = path.resolve(currentDir, config.webPath)
    const sanityTypesPath = path.join(webPath, config.sanityApiPath, config.generatedTypesFile)

    if (fs.existsSync(sanityTypesPath)) {
      return {
        webRoot: webPath,
        sanityTypesPath,
        extendedTypesPath: path.join(webPath, config.sanityApiPath, config.extendedTypesFile),
        structure: {web: config.webPath, studio: './'},
        fromConfig: true,
      }
    } else {
      console.warn('⚠️  Configured path not found, falling back to auto-detection')
    }
  }

  const possibleStructures = [
    {web: '../../web', studio: '../'},
    {web: '../web', studio: '../'},
    {web: '../../../web', studio: '../../'},
    {web: './web', studio: './studio'},
    {web: '../frontend', studio: '../'},
    {web: '../../frontend', studio: '../'},
  ]

  console.log('🔍 Auto-detecting project structure...')

  for (const structure of possibleStructures) {
    const webPath = path.resolve(currentDir, structure.web)
    const sanityTypesPath = path.join(webPath, 'app/utils/sanity-api/sanity.types.ts')

    if (fs.existsSync(sanityTypesPath)) {
      console.log(`✅ Found structure: web="${structure.web}"`)
      return {
        webRoot: webPath,
        sanityTypesPath,
        extendedTypesPath: path.join(webPath, 'app/utils/sanity-api/sanity-extend.types.ts'),
        structure,
        fromConfig: false,
      }
    }
  }

  throw new Error(
    'Could not find web folder with sanity.types.ts. Please check your project structure or create a typegen.config.json file.',
  )
}

// ─── Parser ───────────────────────────────────────────────────────────────────

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Find all `*Reference` types and the document type they point to.
 * Returns e.g. { "ClientReference": "Client", "PersonReference": "Person" }
 */
function findReferenceTypes(content) {
  const refs = {}
  // Match: export type XxxReference = { ... [internalGroqTypeReferenceTo]?: "typename" ... }
  const pattern =
    /export type (\w+Reference) = \{[^[]*\[internalGroqTypeReferenceTo\]\?:\s*['"](\w+)['"]/g
  let m
  while ((m = pattern.exec(content)) !== null) {
    refs[m[1]] = capitalize(m[2]) // e.g. { "ClientReference": "Client" }
  }
  return refs
}

/**
 * Extract the full `export type Name = { ... }` block using brace counting.
 * Returns null if the type is not an object type (e.g. union or array).
 */
function extractObjectTypeBlock(content, typeName) {
  const startPattern = new RegExp(`export type ${typeName}\\s*=\\s*\\{`)
  const match = startPattern.exec(content)
  if (!match) return null

  let depth = 0
  let i = match.index + match[0].length - 1 // opening {

  for (; i < content.length; i++) {
    if (content[i] === '{') depth++
    else if (content[i] === '}') {
      depth--
      if (depth === 0) return content.slice(match.index, i + 1)
    }
  }
  return null
}

/**
 * Return names of all document types (those with `_id: string` and `_createdAt: string`).
 * These are the types that represent Sanity documents.
 */
function findDocumentTypeNames(content) {
  const names = []
  const pattern = /export type (\w+) = \{/g
  let m
  while ((m = pattern.exec(content)) !== null) {
    const name = m[1]
    const block = extractObjectTypeBlock(content, name)
    if (block && block.includes('_id: string') && block.includes('_createdAt: string')) {
      names.push(name)
    }
  }
  return names
}

/**
 * Split a type block into its top-level field definition strings.
 * Handles nested `{ }` and `Array< >` without being confused by them.
 */
function extractTopLevelFields(typeBlock) {
  const startIdx = typeBlock.indexOf('{')
  if (startIdx === -1) return []

  // Find the matching closing brace
  let depth = 0
  let endIdx = -1
  for (let i = startIdx; i < typeBlock.length; i++) {
    if (typeBlock[i] === '{') depth++
    else if (typeBlock[i] === '}') {
      depth--
      if (depth === 0) {
        endIdx = i
        break
      }
    }
  }
  if (endIdx === -1) return []

  const inner = typeBlock.slice(startIdx + 1, endIdx)

  const fields = []
  let braceDepth = 0
  let angleDepth = 0
  let current = ''

  for (const ch of inner) {
    if (ch === '{') braceDepth++
    else if (ch === '}') braceDepth--
    else if (ch === '<') angleDepth++
    else if (ch === '>') angleDepth--

    if (braceDepth === 0 && angleDepth === 0 && (ch === ';' || ch === '\n')) {
      const field = current.trim()
      if (field) fields.push(field)
      current = ''
    } else {
      current += ch
    }
  }

  return fields
}

/**
 * For a document type block, return all fields that contain a reference type.
 * Each result: { fieldName, targetTypeName, isArray }
 */
function findReferenceFields(typeBlock, referenceTypes) {
  const fields = extractTopLevelFields(typeBlock)
  const result = []

  for (const field of fields) {
    for (const [refTypeName, targetTypeName] of Object.entries(referenceTypes)) {
      if (!field.includes(refTypeName)) continue

      const nameMatch = field.match(/^\s*(\w+)\??:/)
      if (!nameMatch) continue
      const fieldName = nameMatch[1]
      if (fieldName.startsWith('_')) continue

      const isArray = /Array\s*</.test(field)

      result.push({fieldName, targetTypeName, isArray})
      break // one reference type per field
    }
  }

  return result
}

// ─── Code generation ──────────────────────────────────────────────────────────

/**
 * Generate the `XxxExpanded` type for one document type.
 * Uses `Omit` to strip the reference fields and re-declares them with resolved types.
 *
 * Example output:
 *   export type ProjectExpanded = Omit<Project, 'client' | 'persons'> & {
 *     client?: Client | null;
 *     persons?: Array<Person> | null;
 *   };
 */
function generateExpandedType(typeName, refFields) {
  const omitKeys = refFields.map((f) => `'${f.fieldName}'`).join(' | ')
  const expandedFields = refFields
    .map((f) => {
      // Special handling for contributions field in Project type
      if (typeName === 'Project' && f.fieldName === 'contributions') {
        return `  ${f.fieldName}?: Array<ContributionExpanded> | null`
      }
      const resolvedType = f.isArray ? `Array<${f.targetTypeName}>` : f.targetTypeName
      return `  ${f.fieldName}?: ${resolvedType} | null`
    })
    .join(';\n')

  return (
    `export type ${typeName}Expanded = Omit<${typeName}, ${omitKeys}> & {\n` +
    `${expandedFields};\n` +
    `};`
  )
}

/**
 * Parse `sanity.types.ts`, find all document types with reference fields,
 * and return the generated file content.
 */
function generateExtendedTypes(content, meta) {
  const referenceTypes = findReferenceTypes(content)

  if (Object.keys(referenceTypes).length === 0) {
    console.warn('⚠️  No reference types found in sanity.types.ts')
  }

  const documentTypeNames = findDocumentTypeNames(content)
  const expandedTypes = []
  const neededImports = new Set()

  // Always add ContributionExpanded if Contribution type exists and has references
  const contributionBlock = extractObjectTypeBlock(content, 'Contribution')
  if (contributionBlock) {
    const contributionRefFields = findReferenceFields(contributionBlock, referenceTypes)
    if (contributionRefFields.length > 0) {
      expandedTypes.push({typeName: 'Contribution', refFields: contributionRefFields})
      neededImports.add('Contribution')
      for (const f of contributionRefFields) {
        neededImports.add(f.targetTypeName)
      }
      console.log(
        `  ✓ ContributionExpanded  [${contributionRefFields.map((f) => (f.isArray ? `${f.fieldName}[]` : f.fieldName)).join(', ')}]`,
      )
    }
  }

  for (const typeName of documentTypeNames) {
    const typeBlock = extractObjectTypeBlock(content, typeName)
    if (!typeBlock) continue

    const refFields = findReferenceFields(typeBlock, referenceTypes)
    if (refFields.length === 0) continue

    expandedTypes.push({typeName, refFields})
    neededImports.add(typeName)
    for (const f of refFields) {
      neededImports.add(f.targetTypeName)
    }

    console.log(
      `  ✓ ${typeName}Expanded  [${refFields.map((f) => (f.isArray ? `${f.fieldName}[]` : f.fieldName)).join(', ')}]`,
    )
  }

  if (expandedTypes.length === 0) {
    throw new Error('No document types with reference fields found. Nothing to generate.')
  }

  const importLine = `import type {\n  ${[...neededImports].join(',\n  ')}\n} from './sanity.types'`

  const typeDefs = expandedTypes
    .map(({typeName, refFields}) => generateExpandedType(typeName, refFields))
    .join('\n\n')

  return (
    `// AUTO-GENERATED EXTENDED TYPES - DO NOT EDIT MANUALLY\n` +
    `// Generated on: ${meta.date}\n` +
    `// Run 'npm run typegen' to regenerate\n` +
    `// Project structure: web="${meta.web}", studio="${meta.studio}"\n` +
    `// Detection method: ${meta.fromConfig ? 'configuration file' : 'auto-detection'}\n` +
    `\n` +
    `${importLine}\n` +
    `\n` +
    `${typeDefs}\n`
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

try {
  const {webRoot, sanityTypesPath, extendedTypesPath, structure, fromConfig} =
    findProjectStructure()

  console.log(`📂 Web folder: ${webRoot}`)
  console.log(`📁 Studio folder: ${path.resolve(__dirname, structure.studio)}`)
  console.log(fromConfig ? '⚙️  Using configuration file' : '🔍 Using auto-detection')

  if (!fs.existsSync(sanityTypesPath)) {
    throw new Error(
      `Generated types not found at: ${sanityTypesPath}. Please run 'sanity typegen generate' first.`,
    )
  }

  const content = fs.readFileSync(sanityTypesPath, 'utf8')

  console.log('🔎 Scanning for reference fields...')
  const extendedTypes = generateExtendedTypes(content, {
    date: new Date().toISOString(),
    web: structure.web,
    studio: structure.studio,
    fromConfig,
  })

  fs.writeFileSync(extendedTypesPath, extendedTypes)

  console.log('✅ Extended types generated successfully!')
  console.log(`📁 Generated: ${extendedTypesPath}`)
} catch (error) {
  console.error('❌ Error generating extended types:', error.message)
  console.log('\n💡 Troubleshooting:')
  console.log('   1. Make sure you have run: sanity typegen generate')
  console.log('   2. Check that your web folder contains: app/utils/sanity-api/sanity.types.ts')
  console.log('   3. Create a typegen.config.json file in the scripts folder for custom paths')
  console.log('   4. Verify your project structure matches one of the supported patterns:')
  console.log('      - studio/scripts -> web (../../web)')
  console.log('      - scripts -> web (../web)')
  console.log('      - nested studio (../../../web)')
  console.log('      - root level (./web)')
  process.exit(1)
}
