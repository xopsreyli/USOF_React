import fetchRequest from '../../../fetchRequest.js'

const deleteComment = async (id) => {
  return fetchRequest(
    `/api/comment/${id}`,
    {
      method: 'DELETE',
    },
    true,
  )
}

export default deleteComment