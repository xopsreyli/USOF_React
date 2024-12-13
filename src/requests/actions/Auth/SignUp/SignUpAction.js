import fetchRequest from '../../../fetchRequest.js'

const signUpAction = async ({request}) => {
  const formData = await request.formData()

  if (formData.get('password') !== formData.get('passwordRepeat')) {
    return {
      status: 400,
      message: 'Passwords do not match'
    }
  }

  return fetchRequest(
    '/api/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({
        login: formData.get('login'),
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export default signUpAction
