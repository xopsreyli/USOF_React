import styles from './App.module.css'
import Header from '../../components/Header/Header.jsx'
import Menu from '../../components/Menu/Menu.jsx'
import {Outlet, useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'

const App = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpened(false)
  }, [location])

  const handleOpenMenu = () => {
    setIsMenuOpened(prev => !prev)
  }

  return (
    <>
      <Header
        isMenuOpened={isMenuOpened}
        burgerOnClick={handleOpenMenu}
      />
      <div className={styles.container}>
        <Menu
          isOpened={isMenuOpened}
        />
        <div className={styles.content}>
          <div className={styles.contentBox}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
