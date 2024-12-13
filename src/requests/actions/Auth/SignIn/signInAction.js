import fetchRequest from '../../../fetchRequest.js'

const signInAction = async ({request}) => {
  const formData = await request.formData()

  return fetchRequest(
    '/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        identifier: formData.get('identifier'),
        password: formData.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export default signInAction
