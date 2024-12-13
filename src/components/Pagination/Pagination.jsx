import styles from './Pagination.module.css'
import {useEffect, useState} from 'react'
import Triangle from '../SVGs/Triangle/Triangle.jsx'
import {useSearchParams} from 'react-router-dom'

const Pagination = ({isNext}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [current, setCurrent] = useState(Number(searchParams.get('page')) || 1)

  useEffect(() => {
    searchParams.set('page', current)
    setSearchParams(searchParams)
  }, [current])

  const prev = () => {
    if (current === 1) {
      return
    }

    setCurrent(current => current - 1)
  }

  const next = () => {
    if (!isNext) {
      return
    }

    setCurrent(current => current + 1)
  }

  return (
    <div className={styles.box}>
      <button
        className={[
          styles.btn,
          current === 1 && styles.hidden,
        ].join(' ')}
        onClick={prev}
      >
        <Triangle
          className={[styles.svg, styles.prev].join(' ')}
        />
      </button>
      <button
        className={[
          styles.page,
          current === 1 && styles.hidden,
        ].join(' ')}
        onClick={prev}
      >{current - 1}</button>
      <button className={[styles.page, styles.current].join(' ')}>{current}</button>
      <button
        className={[
          styles.page,
          !isNext && styles.hidden,
        ].join(' ')}
        onClick={next}
      >{current + 1}</button>
      <button
        className={[
          styles.btn,
          !isNext && styles.hidden,
        ].join(' ')}
        onClick={next}
      >
        <Triangle
          className={[styles.svg, styles.next].join(' ')}
        />
      </button>
    </div>
  )
}

export default Pagination