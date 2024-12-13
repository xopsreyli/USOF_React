import {API_URL} from '../config/constants.js'
import * as LS from '../utils/localStorage.js'

const makeRequest = async (url, options, isAuth) => {
  try {
    const response = await fetch(API_URL + url, {
      ...options,
      headers: {
        ...options.headers,
        ...(isAuth && {'Authorization': `Bearer ${LS.get('accessToken') || ''}`})
      },
    })

    return await response.json()
  } catch (e) {
    return {
      status: 500,
      message: 'Network error. Please try again later'
    }
  }
}

const fetchRequest = async (url, options, isAuth = false) => {
  let result = await makeRequest(url, options, isAuth)
  if (
    [401, 403].includes(result.status) &&
    [
      'Unauthorized: No token provided',
      'Forbidden: Token is invalid'
    ].includes(result.message)
  ) {
    const refreshTokenResult = await makeRequest(
      '/api/auth/token/update',
      {
          method: 'POST',
          body: JSON.stringify({
            token: LS.get('refreshToken')
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

    if (refreshTokenResult.status === 200) {
      LS.set('accessToken', refreshTokenResult.token)
      result = await makeRequest(url, options, isAuth)
    }
  }

  return result
}

export default fetchRequest
