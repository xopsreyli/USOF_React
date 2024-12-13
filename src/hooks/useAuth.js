import {useContext} from 'react'
import {AuthContext} from '../contexts/contexts.js'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
