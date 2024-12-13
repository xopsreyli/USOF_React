import fetchRequest from '../../../fetchRequest.js'

const updatePostLoader = async ({params}) => {
  return fetchRequest(
    `/api/post/${params.id}`,
    {
      method: 'GET',
    },
    true,
  )
}

export default updatePostLoader