import styles from './Users.module.css'
import {Link, useLoaderData} from 'react-router-dom'
import UsersSVG from '../../../components/SVGs/Users/Users.jsx'
import Sorter from '../../../components/Sorter/Sorter.jsx'
import Select from '../../../components/Select/Select.jsx'
import Avatar from '../../../components/Avatar/Avatar.jsx'
import Pagination from '../../../components/Pagination/Pagination.jsx'

const Users = () => {
  const loaderData = useLoaderData()

  const sortByRating = (
    <Select
      displayName="sort by rating"
      paramName='rating'
      values={[
        {
          value: 'ASC',
          displayValue: 'fewest first'
        },
        {
          value: 'DESC',
          displayValue: 'most first'
        },
      ]}
    />
  )

  return (
    <>
      <h1 className={styles.title}>
        <UsersSVG className={styles.titleSVG} />
        <span className={styles.titleText}>users</span>
      </h1>
      <Sorter title='sort users' items={[sortByRating]} />
      <div className={styles.box}>
        {loaderData.users.map(u => (
          <Link
            to={`/profile/${u.id}`}
            className={styles.user}
            key={u.id}
          >
            <div className={styles.avatar}>
              <Avatar name={u.profilePicture} />
            </div>
            <div className={styles.info}>
              <span className={styles.login}>{u.login}</span>
              <span className={styles.rating}>{u.rating}</span>
            </div>
          </Link>
        ))}
      </div>
      <Pagination isNext={loaderData.users.length === 24} />
    </>
  )
}

export default Users