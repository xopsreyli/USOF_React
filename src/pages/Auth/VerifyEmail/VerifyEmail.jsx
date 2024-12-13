import styles from '../Auth.module.css'
import {Form, useActionData} from 'react-router-dom'
import Input from '../../../components/Inputs/Input/Input.jsx'
import Button from '../../../components/Button/Button.jsx'
import {useEffect, useState} from 'react'
import usePersistedState from '../../../hooks/usePersistedState.js'

const VerifyEmail = () => {
  const [email, setEmail] = usePersistedState('emailToVerify', '')
  const actionData = useActionData()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (actionData?.status === 200) {
      setIsSuccess(true)
    } else {
      setError(actionData?.message)
    }
  }, [actionData])

  return (
    <>
      <div
        className={`
          ${styles.success} 
          ${isSuccess ? styles.visibleSuccess : ''}
        `}
      >
        <h1 className={styles.successTitle}>Mail was sent!</h1>
        <p className={`
          ${styles.successText} 
          ${isSuccess ? styles.visibleSuccessText : ''}
        `}>{'Please check your email inbox for a reset password link.'}</p>
      </div>
      <Form
        className={`
            ${styles.form} 
            ${isSuccess ? styles.hiddenForm : ''}
          `}
        method="POST"
      >
        <h1 className={styles.title}>Verify Email</h1>
        <Input
          type="email"
          name="email"
          value={email}
          isRequired
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <p className={styles.error}>{error}</p>
        <div className={styles.btnBox}>
          <Button type="submit" text="verify"/>
        </div>
      </Form>
    </>
  )
}

export default VerifyEmail