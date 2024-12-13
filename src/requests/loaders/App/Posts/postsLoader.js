import fetchRequest from '../../../fetchRequest.js'

const postsLoader = async ({request}) => {
  const url = new URL(request.url)

  return fetchRequest(
    '/api/post/all' + url.search,
    {
      method: 'GET',
    },
    true,
  )
}

export default postsLoader
