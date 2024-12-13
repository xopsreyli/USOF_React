import {Outlet, useNavigate} from 'react-router-dom'
import styles from './Auth.module.css'
import {useEffect, useState} from 'react'
import randAuthBackground from '../../utils/randAuthBackground.js'
import useAuth from '../../hooks/useAuth.js'

const Auth = () => {
  const navigate = useNavigate()
  const [background, setBackground] = useState('')
  const {user} = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/', {replace: true})
    }
    setBackground(randAuthBackground)
  }, [])

  return (
    <>
      <div
        className={styles.background}
        style={{backgroundImage: `url(${background})`}}
      ></div>
      <div className={styles.box}>
        <Outlet/>
      </div>
    </>
  )
}

export default Auth