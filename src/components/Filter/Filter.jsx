import styles from './Filter.module.css'
import Minus from '../SVGs/Minus/Minus.jsx'
import Plus from '../SVGs/Plus/Plus.jsx'
import FilterSVG from '../SVGs/Filter/Filter.jsx'
import {useState} from 'react'

const Filter = ({items = []}) => {
  const [opened, setOpened] = useState(false)
  const [overflow, setOverflow] = useState(false)

  const handleHeaderOnClick = () => {
    setOpened(opened => !opened)
    if (!opened) {
      setTimeout(() => {
        setOverflow(overflow => !overflow)
      }, 200)
    } else {
      setOverflow(overflow => !overflow)
    }
  }

  return (
    <>
      <div className={styles.box}>
        <div className={styles.header} onClick={handleHeaderOnClick}>
          <h1 className={styles.title}>
            <FilterSVG className={styles.titleSVG}/>
            <span className={styles.titleText}>Filter posts</span>
          </h1>
          {opened ? <Minus className={styles.openedSVG}/> : <Plus className={styles.openedSVG}/>}
        </div>
        <div
          className={[
            styles.content,
            opened && styles.contentShown,
          ].join(' ')}
          style={{overflow: overflow ? 'visible' : 'hidden'}}
        >
          <div className={styles.margin}></div>
          <div className={styles.filters}>
            {items.map((item, index) => (
              <div className={styles.item} key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter