import load from '../../../load.js'

const profilePostsLoader = async ({params, request}) => {
  const url = new URL(request.url)
  const page = url.searchParams.get('page')

  return load(
    `/api/user/${params.id}/posts?page=${page ? page : 1}`,
    { method: 'GET' }
  )
}

export default profilePostsLoader
