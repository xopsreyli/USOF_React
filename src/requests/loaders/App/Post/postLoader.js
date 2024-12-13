import fetchRequest from '../../../fetchRequest.js'

const postLoader = async ({params}) => {
  const [
    postResponse,
    likesResponse,
    favoritesResponse,
    commentsResponse,
  ] = await Promise.all([
    fetchRequest(
      `/api/post/${params.id}`,
      {
        method: 'GET',
      },
      true,
    ),
    fetchRequest(
      `/api/post/${params.id}/likes`,
      {
        method: 'GET',
      },
    ),
    fetchRequest(
      `/api/user/favorites`,
      {
        method: 'GET',
      },
      true,
    ),
    fetchRequest(
      `/api/post/${params.id}/comments`,
      {
        method: 'GET',
      },
    ),
  ])

  if (postResponse.status !== 200) {
    throw new Response(postResponse.message, {status: postResponse.status})
  }

  return {
    postResponse: postResponse,
    likesResponse: likesResponse,
    favoritesResponse: favoritesResponse,
    commentsResponse: commentsResponse,
  }
}

export default postLoader