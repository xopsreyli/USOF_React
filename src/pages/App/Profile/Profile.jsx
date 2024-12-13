import {Link, NavLink, Outlet, useLoaderData} from 'react-router-dom'
import styles from './Profile.module.css'
import useAuth from '../../../hooks/useAuth.js'
import hasPermission from '../../../utils/permissions.js'
import Edit from '../../../components/SVGs/Edit/Edit.jsx'
import {useState} from 'react'
import Avatar from '../../../components/Avatar/Avatar.jsx'

const Profile = () => {
  const loaderData = useLoaderData()
  const {user} = useAuth()
  const [title, setTitle] = useState()

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.avatarBox}>
            <Avatar name={loaderData.user.profilePicture} />
          </div>
          <div className={styles.infoBox}>
            <span className={styles.fullName}>{loaderData.user.fullName || '[No data provided]'}</span>
            <span className={styles.login}>{loaderData.user.login}</span>
            <span className={styles.roleBox}>
              Role: <span className={styles.role}>{loaderData.user.role}</span>
            </span>
            <span className={styles.rating}>Rating: {loaderData.user.rating}</span>
          </div>
        </div>
        {
          hasPermission(user, 'update:user', loaderData.user.id)
          ? <div>
              <Link className={styles.edit} to={`/profile/${loaderData.user.id}/edit`}>
                <Edit className={styles.editSVG} />
                <span className={styles.editText}>edit</span>
              </Link>
            </div>
          : null
        }
      </div>
      <nav className={styles.nav}>
        <NavLink
          to={`/profile/${loaderData.user.id}/posts`}
          className={({isActive}) => [
            styles.link,
            isActive ? styles.activeLink : null
          ].join(' ')}
        >Posts</NavLink>
        {
          hasPermission(user, 'view:userOwnProfile', loaderData.user.id)
          ?
            <>
              <NavLink
                to={`/profile/${loaderData.user.id}/favorites`}
                className={({isActive}) => [
                  styles.link,
                  isActive ? styles.activeLink : null
                ].join(' ')}
              >Favorites</NavLink>
              <NavLink
                to={`/profile/${loaderData.user.id}/settings`}
                className={({isActive}) => [
                  styles.link,
                  isActive ? styles.activeLink : null
                ].join(' ')}
              >Settings</NavLink>
            </>
          :
          null
        }
      </nav>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <Outlet context={[loaderData, setTitle]} />
      </div>
    </div>
  )
}

export default Profile