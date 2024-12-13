import styles from './Avatar.module.css'
import User from '../SVGs/User/User.jsx'
import {API_URL} from '../../config/constants.js'

const Avatar = ({name}) => {
  return (
    name ?
      <img
        className={styles.avatar}
        src={API_URL + '/images/avatars/' + name}
        alt=""
      /> :
      <User className={styles.avatarSVG}/>
  )
}

export default Avatar