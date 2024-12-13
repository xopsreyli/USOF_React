import load from '../../../load.js'

const favoritesLoader = async ({request}) => {
  const url = new URL(request.url)
  const page = url.searchParams.get('page')

  return load(
    `/api/user/favorites?page=${page ? page : 1}`,
    { method: 'GET' },
    true
  )
}

export default favoritesLoader
