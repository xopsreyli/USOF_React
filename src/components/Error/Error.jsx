import {useRouteError} from 'react-router-dom'
import styles from './Error.module.css'
import {useEffect, useState} from 'react'

const Error = () => {
  const error = useRouteError()
  const [content, setContent] = useState({
    status: 404,
    message: 'Oops! Page not found',
  })

  useEffect(() => {
   getContent()
  }, [])

  const getContent = async () => {
    if (error) {
      let message

      if (error.data) {
        message = error.data
      } else {
        const result = await error.json()
        message = result.message
      }

      setContent({
        status: error.status,
        message: message
      })
    }
  }

  return (
    <div className={styles.box}>
      <span className={styles.code}>{content.status}</span>
      <p className={styles.text}>{content.message}</p>
    </div>
  )
}

export default Error