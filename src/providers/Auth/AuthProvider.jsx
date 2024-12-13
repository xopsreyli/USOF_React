import {useEffect, useState} from 'react'
import {AuthContext} from '../../contexts/contexts.js'
import getCurrentUser from '../../requests/common/App/getCurrentUser/getCurrentUser.js'
import * as LS from '../../utils/localStorage.js'
import logOut from '../../requests/common/Auth/logOut/logOut.js'

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (LS.get('accessToken')) {
      getUser()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    document.documentElement
      .setAttribute('data-theme', user?.theme)
    document.documentElement
      .setAttribute('color-schema', user?.colorSchema)
  }, [user])

  const getUser = async () => {
    const result = await getCurrentUser()
    if (result.status === 200) {
      setUser(result.user)
    }
    setLoading(false)
  }

  const signIn = (tokens) => {
    LS.set('accessToken', tokens.accessToken)
    LS.set('refreshToken', tokens.refreshToken)
    getUser()
  }

  const logout = () => {
    logOut()
    LS.remove('accessToken')
    LS.remove('refreshToken')
    setUser(null)
  }

  if (loading) {
    return
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
