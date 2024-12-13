import styles from './Button.module.css'

const Button = ({type = 'button', text}) => {
  return (
    <button className={styles.btn} type={type}>{text}</button>
  )
}

export default Button