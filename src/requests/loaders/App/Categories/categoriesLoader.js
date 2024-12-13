import load from '../../load.js'

const categoriesLoader = async ({request}) => {
  const url = new URL(request.url)

  return load('/api/category/all' + url.search, { method: 'GET' })
}

export default categoriesLoader