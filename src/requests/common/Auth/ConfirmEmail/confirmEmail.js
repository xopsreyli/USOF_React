import fetchRequest from '../../../fetchRequest.js'

const confirmEmailLoader = async (token) => {
  return fetchRequest(
    '/api/auth/confirm-email',
    {
      method: 'POST',
      body: JSON.stringify({
        token: token
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export default confirmEmailLoader
