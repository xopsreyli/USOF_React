import fetchRequest from '../../../fetchRequest.js'

const like = async (id, isLike) => {
  return fetchRequest(
    `/api/comment/${id}/like`,
    {
      method: 'POST',
      body: JSON.stringify({
        isLike: isLike,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    true,
  )
}

export default like