import styles from './Leaderboard.module.css'
import Rating from '../../../components/SVGs/Rating/Rating.jsx'
import {Link, useLoaderData} from 'react-router-dom'
import Avatar from '../../../components/Avatar/Avatar.jsx'

const Leaderboard = () => {
  const loaderData = useLoaderData()

  const getPrizePlacesStyles = (i) => {
    if (i === 0) {
      return styles.gold
    } else if (i === 1) {
      return styles.silver
    } else if (i === 2) {
      return styles.bronze
    }
  }

  return (
    <>
      <h1 className={styles.titleBox}>
        <Rating className={styles.titleSVG} />
        <span className={styles.title}>leaderboard</span>
      </h1>
      <div className={styles.box}>
        { loaderData.users.map((u, i) => (
          <Link
            to={`/profile/${u.id}`}
            className={[styles.card, getPrizePlacesStyles(i)].join(' ')}
            key={i}
          >
              <div className={styles.main}>
                <span className={styles.place}>{i + 1}</span>
                <div className={styles.avatarBox}>
                  <Avatar  name={u.profilePicture} />
                </div>
                <span className={styles.login}>{u.login}</span>
              </div>
            <span className={styles.rating}>{u.rating}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Leaderboard