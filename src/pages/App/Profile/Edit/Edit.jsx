import styles from './Edit.module.css'
import {Link, useNavigate, useOutletContext} from 'react-router-dom'
import {useEffect} from 'react'
import EditSVG from '../../../../components/SVGs/Edit/Edit.jsx'
import useAuth from '../../../../hooks/useAuth.js'
import hasPermission from '../../../../utils/permissions.js'
import Avatar from '../../../../components/Avatar/Avatar.jsx'
import deleteAccount from '../../../../requests/common/App/Profile/Edit/deleteAccount.js'

const Edit = () => {
  const {user} = useAuth()
  const [data, setTitle] = useOutletContext()

  useEffect(() => {
    setTitle('profile management')
  }, [])

  const handleDelete = async () => {
    const confirmation = confirm('Are you sure you want to delete your account?')

    if (confirmation) {
      const response = await deleteAccount(user.id)

      if (response.status === 200) {
        window.location.href = '/'
      }
    }
  }

  if (!hasPermission(user, 'view:edit', data.user.id)) {
    throw new Response(
      JSON.stringify({message:  "You do not have permission to access this page"}),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        }
      },
    )
  }

  return (
    <div className={styles.box}>
      <div className={styles.avatarCard}>
        <Link to={`/profile/${user.id}/edit/avatar`} className={styles.avatarBox}>
          <Avatar name={user.profilePicture} />
        </Link>
      </div>
      <Link to={`/profile/${user.id}/edit/fullname`} className={styles.card}>
        <EditSVG className={styles.cardSVG} />
        <div className={styles.content}>
          <span className={styles.label}>full name</span>
          <div className={styles.contentBorder}></div>
          <span
            className={[
              styles.value,
              !user.fullName && styles.unsetedValue
            ].join(' ')}
          >{user.fullName || 'full name'}</span>
        </div>
      </Link>
      <Link to={`/profile/${user.id}/edit/login`} className={styles.card}>
        <EditSVG className={styles.cardSVG} />
        <div className={styles.content}>
          <span className={styles.label}>login</span>
          <div className={styles.contentBorder}></div>
          <span className={styles.value}>{user.login}</span>
        </div>
      </Link>
      <Link to={`/profile/${user.id}/edit/email`} className={styles.card}>
        <EditSVG className={styles.cardSVG} />
        <div className={styles.content}>
          <span className={styles.label}>email</span>
          <div className={styles.contentBorder}></div>
          <span className={styles.value}>{user.email}</span>
        </div>
      </Link>
      <Link to={`/profile/${user.id}/edit/password`} className={styles.card}>
        <EditSVG className={styles.cardSVG} />
        <div className={styles.content}>
          <span className={styles.label}>Password</span>
          <div className={styles.contentBorder}></div>
          <span
            className={[
              styles.value,
              styles.unsetedValue
            ].join(' ')}
          >password</span>
        </div>
      </Link>
      <button
        className={styles.delete}
        onClick={handleDelete}
      >delete</button>
    </div>
  )
}

export default Edit