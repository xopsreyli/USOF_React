import fetchRequest from '../../../../../fetchRequest.js'

const updateEmailAction = async ({params, request}) => {
  const formData = await request.formData()

  return fetchRequest(
    `/api/user/${params.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        email: formData.get('email')
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  )
}

export default updateEmailAction