import fetchRequest from '../../../fetchRequest.js'

const removeFromFavorites = async (id) => {
  return fetchRequest(
    `/api/post/${id}/favorite`,
    {
      method: 'DELETE',
    },
    true,
  )
}

export default removeFromFavorites