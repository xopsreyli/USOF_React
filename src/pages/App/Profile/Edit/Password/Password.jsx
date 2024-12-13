import React, {useState} from 'react'
import useEditForm from '../../../../../hooks/useEditForm.js'
import styles from '../Common.module.css'
import Button from '../../../../../components/Button/Button.jsx'
import {Form} from 'react-router-dom'
import PasswordInput from '../../../../../components/Inputs/PasswordInput/PasswordInput.jsx'

const Password = () => {
  const onSuccess = () => {
    setResult({
      classes: [styles.result, styles.success],
      value: 'Password was successfully updated'
    })
  }
  const [
    user,
    result,
    setResult,
    onSubmit
  ] = useEditForm('update password', onSuccess)
  const [value, setValue] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const handlePasswordOnChange = (e) => {
    setValue(e.target.value)
  }

  const handlePasswordRepeatOnChange = (e) => {
    setPasswordRepeat(e.target.value)
  }

  return (
    <Form method='PATCH' onSubmit={onSubmit}>
      <div className={styles.inputBox}>
        <PasswordInput
          name='password'
          value={value}
          onChange={handlePasswordOnChange}
          placeholder='password'
        />
        <PasswordInput
          name='passwordRepeat'
          value={passwordRepeat}
          onChange={handlePasswordRepeatOnChange}
          placeholder='repeat password'
        />
      </div>
      <div className={result.classes.join(' ')}>{result.value}</div>
      <div className={styles.btnBox}>
        <Button type='submit' text='update' />
      </div>
    </Form>
  )
}

export default Password