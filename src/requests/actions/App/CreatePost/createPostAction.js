import fetchRequest from '../../../fetchRequest.js'

const createPostAction = async ({request}) => {
  const formData = await request.formData()

  return fetchRequest(
    '/api/post',
    {
      method: 'POST',
      body: JSON.stringify({
        title: formData.get('title'),
        content: formData.get('content'),
        categories: formData.get('categories').split(',')
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true,
  )
}

export default createPostAction