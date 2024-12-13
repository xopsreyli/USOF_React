import fetchRequest from '../../../fetchRequest.js'

const categoryLoader = async ({params, request}) => {
  const url = new URL(request.url)

  const [categoryResponse, postsResponse] = await Promise.all([
    fetchRequest(
      `/api/category/${params.id}`,
      {
        method: 'GET',
      }
    ),
    fetchRequest(
      `/api/category/${params.id}/posts${url.search}`,
      {
        method: 'GET',
      },
      true,
    )
  ])

  return {
    categoryResponse: categoryResponse,
    postsResponse: postsResponse,
  }
}

export default categoryLoader