import fetchRequest from '../../../fetchRequest.js'

const getCategories = async (title) => {
  return fetchRequest(
    `/api/category/all?title=${title}`,
    {
      method: 'GET',
    }
  )
}

export default getCategories