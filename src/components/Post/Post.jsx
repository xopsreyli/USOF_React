import styles from './Post.module.css'
import {Link} from 'react-router-dom'
import formatDate from '../../utils/formatDate.js'
import hasPermission from '../../utils/permissions.js'
import useAuth from '../../hooks/useAuth.js'

const Post = ({post}) => {
  const {user} = useAuth()

  return (
    <Link to={`/post/${post.id}`} className={styles.box}>
      <div className={styles.main}>
        <p className={styles.title}>{post.title}</p>
        <div className={styles.ratingBox}>
          <span className={styles.ratingLabel}>Rating:</span>
          <span className={styles.rating}>{post.rating}</span>
        </div>
        <div className={styles.categories}>
          {post.categories.map(c => (
            <Link className={styles.category} to='/' key={c.id}>{c.title}</Link>
          ))}
        </div>
      </div>
      <div className={styles.aside}>
        {
          hasPermission(user, 'view:postStatus', post.author.id) &&
          <span
            className={[
              styles.status,
              post.status === 'active' ? styles.active : styles.inactive
            ].join(' ')}
          >{post.status}</span>
        }
        <span className={styles.date}>{formatDate(post.publishDate)}</span>
      </div>
    </Link>
  )
}

export default Post