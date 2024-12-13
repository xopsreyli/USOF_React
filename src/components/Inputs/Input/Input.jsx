import styles from './Input.module.css'
import {useEffect, useState} from 'react'

const Input = ({
                 type = 'text',
                 name,
                 value,
                 min,
                 max,
                 isRequired = false,
                 onChange = () => {},
                 placeholder,
                 paddingRight,
               }) => {
  const [labelClasses, setLabelClasses] = useState([])

  useEffect(() => {
    toggleLabelClasses(value)
  }, [])

  useEffect(() => {
    toggleLabelClasses()
  }, [value])

  const toggleLabelClasses = () => {
    if (value?.length > 0) {
      setLabelClasses([styles.label, styles.activeLabel])
    } else {
      setLabelClasses([styles.label])
    }
  }

  const handleValueChange = (e) => {
    toggleLabelClasses(e.target.value)
    onChange(e)
  }

  return (
    <div className={styles.box}>
      <input
        className={styles.input}
        type={type}
        id={name}
        name={name}
        value={value}
        minLength={min}
        maxLength={max}
        required={isRequired}
        onChange={handleValueChange}
        style={{paddingRight: paddingRight}}
      />
      <label className={labelClasses.join(' ')} htmlFor={name}>{placeholder}</label>
    </div>
  )
}

export default Input