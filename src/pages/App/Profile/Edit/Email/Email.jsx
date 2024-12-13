import useEditForm from '../../../../../hooks/useEditForm.js'
import {useState} from 'react'
import styles from '../Common.module.css'
import Input from '../../../../../components/Inputs/Input/Input.jsx'
import Button from '../../../../../components/Button/Button.jsx'
import {Form, useNavigate} from 'react-router-dom'
import useAuth from '../../../../../hooks/useAuth.js'

const Email = () => {
  const {logout} = useAuth()
  const navigate = useNavigate()

  const onSuccess = () => {
    let seconds = 10
    const interval = setInterval(() => {
      setResult({
        classes: [styles.result, styles.success],
        value: `Your email address has been updated. Please check your inbox for a confirmation email to verify your new address. You will be logged out in ${seconds} seconds to complete the update process.`
      })
      seconds--

      if (seconds < 0) {
        clearInterval(interval)
        logout()
        navigate('/', {replace: true})
      }
    }, 1000)
  }

  const [
    user,
    result,
    setResult,
    onSubmit
  ] = useEditForm('update email', onSuccess)
  const [value, setValue] = useState(user.email || '')

  const handleOnChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <Form method='PATCH' onSubmit={onSubmit}>
      <div className={styles.inputBox}>
        <Input
          name='email'
          value={value}
          isRequired
          onChange={handleOnChange}
          placeholder='email'
        />
      </div>
      <div className={result.classes.join(' ')}>{result.value}</div>
      <div className={styles.btnBox}>
        <Button type='submit' text='update' />
      </div>
    </Form>
  )
}

export default Email