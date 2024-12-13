import fetchRequest from '../../../fetchRequest.js'

const postAction = async ({params, request}) => {
  const formData = await request.formData()

  return fetchRequest(
    `/api/post/${params.id}/comment`,
    {
      method: 'POST',
      body: JSON.stringify({
        content: formData.get('comment'),
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    },
    true,
  )
}

export default postAction