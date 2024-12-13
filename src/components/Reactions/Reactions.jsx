import styles from './Reactions.module.css'
import Heart from '../SVGs/Heart/Heart.jsx'
import Dislike from '../SVGs/Dislike/Dislike.jsx'

const Reactions = ({
  likes = 0,
  dislikes = 0,
  isLiked = false,
  isDisliked = false,
  onLike = () => {},
  onUnlike = () => {},
                   }) => {
  const handleLike = async () => {
    if (isLiked) {
      await onUnlike()
    } else {
      await onUnlike()
      await onLike(true)
    }
  }

  const handleDislike = async () => {
    if (isDisliked) {
      await onUnlike()
    } else {
      await onUnlike()
      await onLike(false)
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.item}>
        <span className={styles.value}>{likes}</span>
        <button
          className={styles.btn}
          onClick={handleLike}
        >
          <Heart
            className={
            isLiked ? styles.heartSVGActive : styles.heartSVG
            }
          />
        </button>
      </div>
      <div className={styles.item}>
        <span className={styles.value}>{dislikes}</span>
        <button
          className={styles.btn}
          onClick={handleDislike}
        >
          <Dislike
            className={
            isDisliked ? styles.dislikeSVGActive : styles.dislikeSVG
            }
          />
        </button>
      </div>
    </div>
  )
}

export default Reactions