import {useEffect, useState} from 'react'
import styles from '../Auth.module.css'
import Input from '../../../components/Inputs/Input/Input.jsx'
import PasswordInput from '../../../components/Inputs/PasswordInput/PasswordInput.jsx'
import Button from '../../../components/Button/Button.jsx'
import {Form, Link, useActionData, useNavigate} from 'react-router-dom'
import usePersistedState from '../../../hooks/usePersistedState.js'
import useAuth from '../../../hooks/useAuth.js'

const SignIn = () => {
  const navigate = useNavigate()
  const {signIn} = useAuth()
  const [formData, setFormData] = usePersistedState('signInData', {
    identifier: '',
    password: '',
  })
  const actionData = useActionData()
  const [error, setError] = useState('')

  useEffect(() => {
    if (actionData?.status === 200) {
      signIn(actionData.tokens)

      navigate('/', {replace: true})
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

  const handleSubmit = () => {
    setError('')
  }

  return (
    <>
      <Form
        className={styles.form}
        method="POST"
        onSubmit={handleSubmit}
      >
        <h1 className={styles.title}>sign in</h1>
        <Input
          name="identifier"
          value={formData.identifier}
          isRequired
          onChange={handleFormDataUpdate}
          placeholder="Enter your login or email"
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleFormDataUpdate}
          placeholder="Enter your password"
        />
        <p className={styles.error}>{error}</p>
        <Link
          to="/verify-email"
          className={styles.forgot}
        >Forgot password?</Link>
        <div className={styles.btnBox}>
          <Button type="submit" text="Sign In"/>
        </div>
        <p className={styles.switchAuth}>
          {'Don\'t have an account?'}
          <Link
            to="/signup"
            className={styles.switchAuthLink}
            replace
          >
            sign up
          </Link>
        </p>
      </Form>
    </>
  )
}

export default SignIn