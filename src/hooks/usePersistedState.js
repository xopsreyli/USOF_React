import {useEffect, useState} from 'react'
import * as LS from '../utils/localStorage.js'

const usePersisterState = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const item = LS.get(key)
    return item || initialValue
  })

  useEffect(() => {
    LS.set(key, value)
    // window.addEventListener('beforeunload', () => {
    //   LS.remove(key)
    // })

    return () => {
      LS.remove(key)
    }
  }, [value])

  return [value, setValue]
}

export default usePersisterState
