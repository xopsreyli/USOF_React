import styles from './Posts.module.css'
import Post from '../Post/Post.jsx'

const Posts = ({posts}) => {
  return (
    <>
      <div className={styles.box}>
        { posts.map(p => <Post key={p.id} post={p} />) }
      </div>
    </>
  )
}

export default Posts