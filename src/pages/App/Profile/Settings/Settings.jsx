import styles from './Settings.module.css'
import useAuth from '../../../../hooks/useAuth.js'
import {useOutletContext} from 'react-router-dom'
import Moon from '../../../../components/SVGs/Moon/Moon.jsx'
import Sun from '../../../../components/SVGs/Sun/Sun.jsx'
import {useEffect, useState} from 'react'
import setThemeMode from '../../../../requests/common/App/Profile/Settings/setThemeMode.js'
import setColorSchema from '../../../../requests/common/App/Profile/Settings/setColorSchema.js'
import hasPermission from '../../../../utils/permissions.js'

const Settings = () => {
  const {user, setUser} = useAuth()
  const [data, setTitle] = useOutletContext()
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    setTitle('settings')
  }, [])

  const handleSwitchThemeMode = async () => {
    const theme = user.theme === 'dark' ? 'light' : 'dark'
    const result = await setThemeMode(user.id, theme)

    if (result.status === 200) {
      setUser(prev => ({
        ...prev,
        theme: theme,
      }))
      setTrigger(value => !value)
    }
  }

  const handleChangeColorSchema = async (e) => {
    const color = e.target.value
    const result = await setColorSchema(user.id, color)

    if (result.status === 200) {
      setUser(prev => ({
        ...prev,
        colorSchema: color,
      }))
      setTrigger(value => !value)
    }
  }

  if (!hasPermission(user, 'view:settings', data.user.id)) {
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
    <>
      <div className={styles.themeBox}>
        <span className={styles.label}>Theme:</span>
        <div className={styles.themeToggler} onClick={handleSwitchThemeMode}>
          <div className={styles.themeMode}>
            <Moon
              className={[
                styles.moon,
                user.theme === 'dark' && styles.moonPicked,
              ].join(' ')}
            />
            <span
              className={[
                styles.themeModeName,
                user.theme === 'dark' && styles.themeModeNamePicked,
              ].join(' ')}
            >dark</span>
          </div>
          <div className={styles.themeMode}>
            <Sun
              className={[
                styles.sun,
                user.theme === 'light' && styles.sunPicked,
              ].join(' ')}
            />
            <span
              className={[
                styles.themeModeName,
                user.theme === 'light' && styles.themeModeNamePicked,
              ].join(' ')}
            >light</span>
          </div>
          <div
            className={[
              styles.themeTogglerThumb,
              user.theme === 'light' && styles.themeTogglerThumbLight,
            ].join(' ')}
          ></div>
        </div>
      </div>
      <div className={styles.schemaBox}>
        <span className={styles.label}>Color Schema:</span>
        <form className={styles.colors}>
          <input
            className={styles.colorInput}
            type="radio"
            name="color"
            id="red"
            value="red"
            checked={user.colorSchema === 'red'}
            onChange={handleChangeColorSchema}
          />
          <label
            htmlFor="red"
            className={styles.color}
            style={{backgroundColor: '#8b2222'}}
          >
            <div
              className={styles.pickedColor}
              style={{borderColor: '#8b2222'}}
            ></div>
          </label>
          <input
            className={styles.colorInput}
            type="radio"
            name="color"
            id="orange"
            value="orange"
            checked={user.colorSchema === 'orange'}
            onChange={handleChangeColorSchema}
          />
          <label
            htmlFor="orange"
            className={styles.color}
            style={{backgroundColor: '#ff8c00'}}
          >
            <div
              className={styles.pickedColor}
              style={{borderColor: '#ff8c00'}}
            ></div>
          </label>
          <input
            className={styles.colorInput}
            type="radio"
            name="color"
            id="yellow"
            value="yellow"
            checked={user.colorSchema === 'yellow'}
            onChange={handleChangeColorSchema}
          />
          <label
            htmlFor="yellow"
            className={styles.color}
            style={{backgroundColor: '#ffd700'}}
          >
            <div
              className={styles.pickedColor}
              style={{borderColor: '#ffd700'}}
            ></div>
          </label>
          <input
            className={styles.colorInput}
            type="radio"
            name="color"
            id="green"
            value="green"
            checked={user.colorSchema === 'green'}
            onChange={handleChangeColorSchema}
          />
          <label
            htmlFor="green"
            className={styles.color}
            style={{backgroundColor: '#228b22'}}
          >
            <div
              className={styles.pickedColor}
              style={{borderColor: '#228b22'}}
            ></div>
          </label>
          <input
            className={styles.colorInput}
            type="radio"
            name="color"
            id="lightblue"
            value="lightblue"
            checked={user.colorSchema === 'lightblue'}
            onChange={handleChangeColorSchema}
          />
          <label
            htmlFor="lightblue"
            className={styles.color}
            style={{backgroundColor: '#00bfff'}}
          >
            <div
              className={styles.pickedColor}
              style={{borderColor: '#00bfff'}}
            ></div>
          </label>
          <input
            className={styles.colorInput}
            type="radio"
            name="color"
            id="blue"
            value="blue"
            checked={user.colorSchema === 'blue'}
            onChange={handleChangeColorSchema}
          />
          <label
            htmlFor="blue"
            className={styles.color}
            style={{backgroundColor: '#4169e1'}}
          >
            <div
              className={styles.pickedColor}
              style={{borderColor: '#4169e1'}}
            ></div>
          </label>
          <input
            className={styles.colorInput}
            type="radio"
            name="color"
            id="purple"
            value="purple"
            checked={user.colorSchema === 'purple'}
            onChange={handleChangeColorSchema}
          />
          <label
            htmlFor="purple"
            className={styles.color}
            style={{backgroundColor: '#8a2be2'}}
          >
            <div
              className={styles.pickedColor}
              style={{borderColor: '#8a2be2'}}
            ></div>
          </label>
          <input
            className={styles.colorInput}
            type="radio"
            name="color"
            id="pink"
            value="pink"
            checked={user.colorSchema === 'pink'}
            onChange={handleChangeColorSchema}
          />
          <label
            htmlFor="pink"
            className={styles.color}
            style={{backgroundColor: '#ff69b4'}}
          >
            <div
              className={styles.pickedColor}
              style={{borderColor: '#ff69b4'}}
            ></div>
          </label>
        </form>
      </div>
    </>
  )
}

export default Settings