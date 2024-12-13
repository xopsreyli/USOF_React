import styles from './AskQuestionBtn.module.css'
import {Link} from 'react-router-dom'

const AskQuestionBtn = () => {
  return (
    <Link to='/post/new' className={styles.link}>ask question</Link>
  )
}

export default AskQuestionBtn