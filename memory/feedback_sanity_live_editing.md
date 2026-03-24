---
name: sanity-live-editing-fix
description: How we fixed Sanity visual editing live updates not reflecting in the Presentation tool iframe
type: project
---

Two bugs caused Sanity live visual editing to not update content in the Presentation tool:

1. **Missing `mode: "live-visual-editing"` in `nuxt.config.ts`** — without it, the `visual-editing.client.js` plugin exits early and never calls `useSanityVisualEditing()` or `useSanityLiveMode()`. The `enableQueryFetcher` check in `useSanityQuery` also requires this mode explicitly.

2. **`useSanityData.ts` was watching the wrong ref** — the old code did `await useSanityQuery()` and destructured `data`, but `await` resolves to Nuxt's `AsyncData` object whose `.data` ref is NOT updated by live query snapshots. The `standaloneRef` (updated by `updateRefs` on every live snapshot) lives on the promise object itself and must be accessed BEFORE the `await`. Fix: `const queryResult = useSanityQuery(...); const data = queryResult.data; await queryResult;`

**Why:** Initial render still worked (SSR hydration delivered correct content via the AsyncData ref), masking the bug. Only live updates were broken because they updated the standaloneRef which nothing was watching.

**How to apply:** If live editing stops working again after changes to `useSanityData` or nuxt config, check both of these.
