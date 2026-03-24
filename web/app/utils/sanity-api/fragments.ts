export const seo = `
	...,
	metaImage{
		asset->
	}
`

// export const figure = `
// 	...,
// 	image{
// 		asset->
// 	},
// 	caption,
// 	link->{
// 		_type,
// 		slug
// 	}
// `

export const blockContent = `
	...,
	en[]{
		...,
		markDefs[] {
			...,
			_type == "linkInternal" => {
				...,
				reference->,

			},
		},
		_type == 'icon' => {
			...,
			image{
				asset->
			},
    }
	},
	fr[]{
		...,
		markDefs[] {
			...,
			_type == "linkInternal" => {
				...,
				reference->,

			},

		},
		_type == 'icon' => {
			...,
			image{
				asset->
			},
    }
	}
`

export const projectCard = `
  _type,
  seo{
    ${seo}
  },
  title,
  imageCover{
    ...,
    asset->
  },
  rip,
  year,
  ID,
  client->,
  contributions[]{
    service->{
      title
    },
    contributors[]->{
      name
    }
  },
  // relatedProject->{
  //   _type,
  //   slug,
  //   title,
  // }
`

export const textUI = `
  _type == 'textUI' => {
    ...,
    text{
      ${blockContent}
    }
  }
`
export const listProjectsUI = `
	_type == 'listProjectsUI' => {
		...,
		items[]->{
			${projectCard}
		},
	}
`

export const modules = `
	...,
	${textUI},
	${listProjectsUI},
`
