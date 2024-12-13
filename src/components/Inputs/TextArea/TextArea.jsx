import styles from './TextArea.module.css'

const TextArea = ({
  name = '',
  value = '',
  onChange = () => {},
  placeholder = '',
  isRequired = false,
                  }) => {
  const handleOnChange = (e) => {
    onChange(e)
  }

  return (
    <textarea
      className={styles.textarea}
      name={name}
      id={name}
      value={value}
      rows="10"
      placeholder={placeholder}
      required={isRequired}
      onChange={handleOnChange}
    ></textarea>
  )
}

export default TextArea