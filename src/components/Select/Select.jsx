import styles from './Select.module.css'
import Triangle from '../SVGs/Triangle/Triangle.jsx'
import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'

const Select = ({
                  displayName,
                  paramName,
                  values = [],
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [current, setCurrent] = useState(searchParams.get(paramName))
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    setCurrent(searchParams.get(paramName))
  }, [searchParams])

  const handleBoxOnClick = () => {
    setOpened(opened => !opened)
  }

  const handleChangeValue = (e) => {
    if (!e.target.value) {
      searchParams.delete(paramName)
    } else {
      searchParams.set(paramName, e.target.value)
    }

    setSearchParams(searchParams)
  }

  return (
    <div className={styles.box} >
      <div
        className={styles.header}
        onClick={handleBoxOnClick}
      >
        <span className={styles.name}>{displayName}</span>
        <Triangle className={[
            styles.svg,
            opened || styles.svgActive,
          ].join(' ')}
        />
      </div>
      <div className={[
        styles.values,
        opened && styles.valuesActive
      ].join(' ')}
      >
        <div
          className={[
            styles.valueBox,
            !current && styles.valueBoxActive,
          ].join(' ')}
        >
          <input
            className={styles.input}
            type="radio"
            name={paramName}
            id={`${paramName}-empty`}
            value={undefined}
            onChange={handleChangeValue}
          />
          <label
            className={styles.value}
            htmlFor={`${paramName}-empty`}
          >--</label>
        </div>
        {values.map((v, i) => (
          <div
            className={[
              styles.valueBox,
              current === v.value && styles.valueBoxActive,
            ].join(' ')}
            key={i}
          >
            <input
              className={styles.input}
              type="radio"
              name={paramName}
              id={`${paramName}-${v.value}`}
              value={v.value}
              onChange={handleChangeValue}
            />
            <label
              className={styles.value}
              htmlFor={`${paramName}-${v.value}`}
            >{v.displayValue}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Select