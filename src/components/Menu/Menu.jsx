import styles from './Menu.module.css'
import {NavLink, useNavigate} from 'react-router-dom'
import House from '../SVGs/House/House.jsx'
import useAuth from '../../hooks/useAuth.js'
import Rating from '../SVGs/Rating/Rating.jsx'
import Category from '../SVGs/Category/Category.jsx'
import Users from '../SVGs/Users/Users.jsx'
import Posts from '../SVGs/Posts/Posts.jsx'

const Menu = ({isOpened = false}) => {
  const {user, logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/', {replace: true})
  }

  return (
    <div className={[
      styles.box,
      isOpened && styles.opened
    ].join(' ')}
    >
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({isActive}) => [
            styles.link,
            isActive ? styles.active : null,
          ].join(' ')
          }
        >
          {({isActive}) => (
            <>
              <House
                className={[
                  styles.linkSVG,
                  isActive ? styles.linkSVGActive : '',
                ].join(' ')}
              />
              <span>Home</span>
            </>
          )}
        </NavLink>
        <div className={styles.free}></div>
        <NavLink
          to="/posts"
          className={({isActive}) => [
            styles.link,
            isActive ? styles.active : null,
          ].join(' ')
          }
        >
          {({isActive}) => (
            <>
              <Posts
                className={[
                  styles.linkSVG,
                  isActive ? styles.linkSVGActive : '',
                ].join(' ')}
              />
              <span>posts</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/categories"
          className={({isActive}) => [
            styles.link,
            isActive ? styles.active : null,
          ].join(' ')
          }
        >
          {({isActive}) => (
            <>
              <Category
                className={[
                  styles.linkSVG,
                  isActive ? styles.linkSVGActive : '',
                ].join(' ')}
              />
              <span>categories</span>
            </>
          )}
        </NavLink>
        <div className={styles.free}></div>
        <NavLink
          to="/users"
          className={({isActive}) => [
            styles.link,
            isActive ? styles.active : null,
          ].join(' ')
          }
        >
          {({isActive}) => (
            <>
              <Users
                className={[
                  styles.linkSVG,
                  isActive ? styles.linkSVGActive : '',
                ].join(' ')}
              />
              <span>users</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({isActive}) => [
            styles.link,
            isActive ? styles.active : null,
          ].join(' ')
          }
        >
          {({isActive}) => (
            <>
              <Rating
                className={[
                  styles.linkSVG,
                  isActive ? styles.linkSVGActive : '',
                ].join(' ')}
              />
              <span>leaderboard</span>
            </>
          )}
        </NavLink>
      </nav>
      {
        user
          ?
          <button
            className={styles.logout}
            onClick={handleLogout}
          >log out</button>
          :
          null
      }
    </div>
  )
}

export default Menu