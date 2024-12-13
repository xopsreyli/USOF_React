import styles from './Category.module.css'
import {Link} from 'react-router-dom'

const Category = ({category}) => {
  return (
    <Link to={`/category/${category.id}`} className={styles.box}>
      <h1 className={styles.title}>{category.title}</h1>
      <p className={styles.description}>{category.description}</p>
      <p className={styles.postsAmountBox}>
        <span className={styles.postsAmountText}>posts</span>
        <span className={styles.postsAmount}>{category.numberOfPosts}</span>
      </p>
    </Link>
  )
}

export default Category