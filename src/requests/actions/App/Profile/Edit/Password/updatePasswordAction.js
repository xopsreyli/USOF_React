import fetchRequest from '../../../../../fetchRequest.js'

const updatePasswordAction = async ({params, request}) => {
  const formData = await request.formData()

  if (formData.get('password') !== formData.get('passwordRepeat')) {
    return {
      status: 400,
      message: 'Passwords do not match'
    }
  }

  return fetchRequest(
    `/api/user/${params.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        password: formData.get('password')
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  )
}

export default updatePasswordAction