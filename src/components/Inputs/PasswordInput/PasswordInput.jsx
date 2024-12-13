import Input from '../Input/Input.jsx'
import Eye from '../../SVGs/Eye/Eye.jsx'
import styles from './PasswordInput.module.css'
import HiddenEye from '../../SVGs/HiddenEye/HiddenEye.jsx'
import {useState} from 'react'

const PasswordInput = ({
                         name,
                         value,
                         onChange,
                         placeholder,
                       }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = (e) => {
    e.preventDefault()
    setIsVisible(isVisible => !isVisible)
  }

  return (
    <div className={styles.box}>
      <Input
        type={isVisible ? 'text' : 'password'}
        name={name}
        value={value}
        min={8}
        max={64}
        isRequired
        onChange={onChange}
        placeholder={placeholder}
        paddingRight="40px"
      />
      <button className={styles.btn} onClick={toggleVisibility}>
        <div className={styles.track} style={{top: isVisible ? 0 : '-100%'}}>
          <Eye className={styles.eye}/>
          <HiddenEye className={styles.hiddenEye}/>
        </div>
      </button>
    </div>
  )
}

export default PasswordInput