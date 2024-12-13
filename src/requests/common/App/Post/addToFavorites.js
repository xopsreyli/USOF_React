import fetchRequest from '../../../fetchRequest.js'

const addToFavorites = async (id) => {
  return fetchRequest(
    `/api/post/${id}/favorite`,
    {
      method: 'POST',
    },
    true,
  )
}

export default addToFavorites