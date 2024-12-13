import fetchRequest from '../../../fetchRequest.js'

const usersLoader = async ({request}) => {
  const url = new URL(request.url)

  return fetchRequest(
    '/api/user/all' + url.search,
    {
      method: 'GET',
    },
  )
}

export default usersLoader