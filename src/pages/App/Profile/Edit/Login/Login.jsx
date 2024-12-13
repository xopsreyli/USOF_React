import useEditForm from '../../../../../hooks/useEditForm.js'
import {useState} from 'react'
import {Form} from 'react-router-dom'
import styles from '../Common.module.css'
import Input from '../../../../../components/Inputs/Input/Input.jsx'
import Button from '../../../../../components/Button/Button.jsx'

const Login = () => {
  const onSuccess = () => {
    setResult({
      classes: [styles.result, styles.success],
      value: 'Email was successfully updated'
    })
  }
  const [
    user,
    result,
    setResult,
    onSubmit
  ] = useEditForm('update login', onSuccess)
  const [value, setValue] = useState(user.login || '')

  const handleOnChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <Form method='PATCH' onSubmit={onSubmit}>
      <div className={styles.inputBox}>
        <Input
          name='login'
          value={value}
          isRequired
          onChange={handleOnChange}
          placeholder='login'
        />
      </div>
      <div className={result.classes.join(' ')}>{result.value}</div>
      <div className={styles.btnBox}>
        <Button type='submit' text='update' />
      </div>
    </Form>
  )
}

export default Login