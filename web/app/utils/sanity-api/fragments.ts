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
export const video = `
  asset->{
    playbackId,
    data{
      aspect_ratio,
      duration
    }
  },
  placeholder{
    asset->
  }
`

export const projectCardMini = `
  _type,
  slug,
  ID,
  title,
  imageCover{
    ...,
    asset->
  },
  client->,
`
export const projectCard = `
  _type,
  slug,
  seo{
    ${seo}
  },
  title,
  imageCover{
    ...,
    asset->
  },
  videoCover{
    ...,
    video{
      asset->
    }
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
  media[]{
    ...,
    _type == 'image' => {
      ...,
      asset->
    },
    _type == 'video' => {
      ...,
      video{
        ${video}
      }
    },
  },
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
export const clientsUI = `
  	_type == 'clientsUI' => {
		...,
    items[]{
      ...,
      asset->
    }
	}
`
export const locationMapUI = `
  	_type == 'locationMapUI' => {
		...,
    map{
      asset->
    }
	}
`
export const contactsUI = `
  	_type == 'contactsUI' => {
		...,
    items[]{
      ...
    }
	}
`
export const granularStripeUI = `
  	_type == 'granularStripeUI' => {
		...,
    image{
      asset->
    }
	}
`
export const servicesUI = `
  _type == 'servicesUI' => {
    ...,
    text{
      ${blockContent}
    },
    accordion{
      ...
    }
  }
`

// export const mediaUI = `
//   _type == 'mediaUI' => {
//     ...,
//     "items": *[_type == 'sanity.imageAsset']{
//       asset->
//     }
//   }
// `

export const videoUI = `
  _type == 'videoUI' => {
    ...,
    video{
      video{
        ${video}
      }
    }
  }
`

export const modules = `
	...,
	${textUI},
	${listProjectsUI},
	${clientsUI},
  ${locationMapUI},
  ${contactsUI},
  ${granularStripeUI},
  ${servicesUI},
  ${videoUI}
`
