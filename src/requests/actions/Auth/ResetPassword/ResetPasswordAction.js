import fetchRequest from '../../../fetchRequest.js'

const resetPasswordAction = async ({request}) => {
  const url = new URL(request.url)
  const formData = await request.formData()

  if (formData.get('password') !== formData.get('passwordRepeat')) {
    return {
      status: 400,
      message: 'Passwords do not match'
    }
  }

  return fetchRequest(
    '/api/auth/password-reset/update',
    {
      method: 'POST',
      body: JSON.stringify({
        token: url.searchParams.get('token'),
        password: formData.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export default resetPasswordAction
