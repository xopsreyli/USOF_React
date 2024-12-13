import styles from '../Auth.module.css'
import Input from '../../../components/Inputs/Input/Input.jsx'
import PasswordInput from '../../../components/Inputs/PasswordInput/PasswordInput.jsx'
import {Form, useActionData, useNavigate} from 'react-router-dom'
import Button from '../../../components/Button/Button.jsx'
import usePersistedState from '../../../hooks/usePersistedState.js'
import {useEffect, useState} from 'react'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = usePersistedState('resetPasswordData', {
    password: '',
    passwordRepeat: '',
  })
  const actionData = useActionData()
  const [error, setError] = useState('')

  useEffect(() => {
    if (actionData?.status === 200) {
      navigate('/signin', {replace: true})
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
        <h1 className={styles.title}>Reset Password</h1>
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleFormDataUpdate}
          placeholder="Enter your new password"
        />
        <PasswordInput
          name="passwordRepeat"
          value={formData.passwordRepeat}
          onChange={handleFormDataUpdate}
          placeholder="Repeat your new password"
        />
        <p className={styles.error}>{error}</p>
        <div className={styles.btnBox}>
          <Button type="submit" text="reset"/>
        </div>
      </Form>
    </>
  )
}

export default ResetPassword