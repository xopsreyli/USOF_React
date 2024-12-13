import styles from './DateInput.module.css'
import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'

const DateInput = ({
  label,
  name,
  paramName,
                   }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(searchParams.get(paramName))
  }, [searchParams])

  const handleOnChange = (e) => {
    if (e.target.value === '') {
      searchParams.delete(paramName)
      setValue('')
    } else {
      searchParams.set(paramName, e.target.value)
    }

    setSearchParams(searchParams)
  }

  return (
    <div className={styles.box} >
      <label
        className={styles.label}
        htmlFor={name}
      >{label}</label>
      <input
        className={styles.input}
        type="date"
        name={name}
        id={name}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default DateInput