import {useNavigate, useSearchParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import confirmEmail from '../../../requests/common/Auth/ConfirmEmail/confirmEmail.js'
import styles from '../Auth.module.css'
import confirmEmailStyles from './ConfirmEmail.module.css'
import Loader from '../../../components/SVGs/Loader/Loader.jsx'
import Tick from '../../../components/SVGs/Tick/Tick.jsx'

const ConfirmEmail = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    handleRequestResult()
  }, [])

  const handleRequestResult = async () => {
    const result = await confirmEmail(searchParams.get('token'))

    setTimeout(() => {
      if (result.status === 200) {
        setIsSuccess(true)

        setTimeout(() => {
          navigate('/signin', {replace: true})
        }, 2250)
      } else {
        setError(result.message)
      }
    }, 1000)
  }

  return (
    <>
      <div
        className={confirmEmailStyles.info}
        style={{display: error ? 'none' : 'flex'}}
      >
        <p className={confirmEmailStyles.text}>Confirming email</p>
        <div className={confirmEmailStyles.process}>
          <div
            className={`
              ${confirmEmailStyles.loaderWrapper}
              ${isSuccess ? confirmEmailStyles.hiddenLoader : ''}
            `}
          >
            <Loader className={confirmEmailStyles.loader}/>
          </div>
          <Tick
            className={`
              ${confirmEmailStyles.tick}
              ${isSuccess ? confirmEmailStyles.visibleTick : ''}
            `}
          />
        </div>
      </div>
      <p
        className={confirmEmailStyles.error}
        style={{display: error ? 'block' : 'none'}}
      >{error}</p>
    </>
  )
}

export default ConfirmEmail