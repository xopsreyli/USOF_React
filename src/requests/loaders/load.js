import fetchRequest from '../fetchRequest.js'

const load = async (url, options, isAuth = false) => {
  const result = await fetchRequest(url, options, isAuth)

  if (result.status !== 200) {
    throw new Response(result.message, { status: result.status })
  }

  return result
}

export default load