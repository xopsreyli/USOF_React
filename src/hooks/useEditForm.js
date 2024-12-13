import {useEffect, useState} from 'react'
import {useActionData, useOutletContext} from 'react-router-dom'
import hasPermission from '../utils/permissions.js'
import useAuth from './useAuth.js'
import styles from '../pages/App/Profile/Edit/Common.module.css'

const useEditForm = (title, onSuccess) => {
  const {user} = useAuth()
  const [data, setTitle] = useOutletContext()
  const [result, setResult] = useState({
    classes: [styles.result],
    value: '',
  })
  const actionData = useActionData()

  useEffect(() => {
    setTitle(title)
  }, [])

  useEffect(() => {
    if (actionData?.status === 200) {
      onSuccess()
    } else {
      setResult({
        classes: [styles.result, styles.success],
        value: actionData?.message
      })
    }
  }, [actionData])

  const onSubmit = () => {
    setResult({
      classes: [styles.result],
      value: '',
    })
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

  return [user, result, setResult, onSubmit]
}

export default useEditForm