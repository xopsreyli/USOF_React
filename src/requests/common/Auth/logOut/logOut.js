import fetchRequest from '../../../fetchRequest.js'

const logOut = () => {
  return fetchRequest(
    '/api/auth/logout',
    {
      method: 'POST',
    },
    true,
  )
}

export default logOut
