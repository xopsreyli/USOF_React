import styles from '../Common.module.css'
import {Form} from 'react-router-dom'
import {useState} from 'react'
import Input from '../../../../../components/Inputs/Input/Input.jsx'
import Button from '../../../../../components/Button/Button.jsx'
import useEditForm from '../../../../../hooks/useEditForm.js'

const FullName = () => {
  const onSuccess = () => {
    setResult({
      classes: [styles.result, styles.success],
      value: 'Full name was successfully updated'
    })
  }
  const [
    user,
    result,
    setResult,
    onSubmit,
  ] = useEditForm('update full name', onSuccess)
  const [value, setValue] = useState(user.fullName || '')

  const handleOnChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <Form method='PATCH' onSubmit={onSubmit}>
      <div className={styles.inputBox}>
        <Input
          name='fullName'
          value={value}
          isRequired
          onChange={handleOnChange}
          placeholder='full name'
        />
      </div>
      <div className={result.classes.join(' ')}>{result.value}</div>
      <div className={styles.btnBox}>
        <Button type='submit' text='update' />
      </div>
    </Form>
  )
}

export default FullName