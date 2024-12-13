import fetchRequest from '../../../fetchRequest.js'

const  homeLoader = async () => {
  return fetchRequest(
    '/api/post/all?date=DESC',
    {
      method: 'GET',
    },
  )
}

 export default homeLoader