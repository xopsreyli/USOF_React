import fetchRequest from '../../../fetchRequest.js'

const getCommentLikes = (id) => {
  return fetchRequest(
    `/api/comment/${id}/likes`,
    {
      method: 'GET',
    },
  )
}

export default getCommentLikes