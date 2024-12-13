import styles from '../Auth.module.css'
import Input from '../../../components/Inputs/Input/Input.jsx'
import {useEffect, useState} from 'react'
import Button from '../../../components/Button/Button.jsx'
import {Form, Link, useActionData} from 'react-router-dom'
import PasswordInput from '../../../components/Inputs/PasswordInput/PasswordInput.jsx'
import usePersistedState from '../../../hooks/usePersistedState.js'
import * as LS from '../../../utils/localStorage.js'

const SignUp = () => {
  const [formData, setFormData] = usePersistedState('signUpData', {
    login: '',
    email: '',
    password: '',
    passwordRepeat: '',
  })
  const actionData = useActionData()
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (actionData?.status === 200) {
      setIsSuccess(true)
      LS.remove('signUpData')
    } else {
      setError(actionData?.message)
    }
  }, [actionData])

  const handleFormDataUpdate = (e) => {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSignUp = () => {
    setError('')
  }

  return (
    <>
      <div
        className={`
          ${styles.success} 
          ${isSuccess ? styles.visibleSuccess : ''}
        `}
      >
        <h1 className={styles.successTitle}>Registration Successful!</h1>
        <p className={`
          ${styles.successText} 
          ${isSuccess ? styles.visibleSuccessText : ''}
        `}>{'Thank you for signing up! Please check your email inbox for a confirmation link to complete your registration. Once you\'ve confirmed your email, you\'ll be able to log in.'}</p>
      </div>
      <Form
        className={`
            ${styles.form} 
            ${isSuccess ? styles.hiddenForm : ''}
          `}
        method="POST"
        onSubmit={handleSignUp}
      >
        <h1 className={styles.title}>sign up</h1>
        <Input
          name="login"
          value={formData.login}
          isRequired
          onChange={handleFormDataUpdate}
          placeholder="Enter your login"
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          isRequired
          onChange={handleFormDataUpdate}
          placeholder="Enter your email"
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleFormDataUpdate}
          placeholder="Enter your password"
        />
        <PasswordInput
          name="passwordRepeat"
          value={formData.passwordRepeat}
          onChange={handleFormDataUpdate}
          placeholder="Repeat your password"
        />
        <p className={styles.error}>{error}</p>
        <div className={styles.btnBox}>
          <Button type="submit" text="Sign Up"/>
        </div>
        <p className={styles.switchAuth}>
          Already have an account?
          <Link
            to="/signin"
            className={styles.switchAuthLink}
            replace
          >
            sign in
          </Link>
        </p>
      </Form>
    </>
  )
}

export default SignUp