import fetchRequest from '../../../fetchRequest.js'

const unlike = async (id) => {
  return fetchRequest(
    `/api/post/${id}/like`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    true,
  )
}

export default unlike