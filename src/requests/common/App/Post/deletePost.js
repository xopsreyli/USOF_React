import fetchRequest from '../../../fetchRequest.js'

const deletePost = async (id) => {
  return fetchRequest(
    `/api/post/${id}`,
    {
      method: 'DELETE',
    },
    true,
  )
}

export default deletePost