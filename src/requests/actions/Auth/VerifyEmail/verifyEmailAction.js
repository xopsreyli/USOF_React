import fetchRequest from '../../../fetchRequest.js'

const verifyEmail = async ({request}) => {
  const formData = await request.formData()

  return fetchRequest(
    '/api/auth/password-reset',
    {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export default verifyEmail
