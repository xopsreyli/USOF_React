import fetchRequest from '../../../fetchRequest.js'

const getCurrentUser = async () => {
  return fetchRequest(
    '/api/user',
    {
      method: 'GET',
    },
    true,
  )
}

export default getCurrentUser
