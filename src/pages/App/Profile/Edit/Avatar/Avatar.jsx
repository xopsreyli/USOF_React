import styles from './Avatar.module.css'
import commonStyles from '../Common.module.css'
import {Form} from 'react-router-dom'
import {useState} from 'react'
import Button from '../../../../../components/Button/Button.jsx'
import useEditForm from '../../../../../hooks/useEditForm.js'

const Avatar = () => {
  const onSuccess = () => {
    window.location.reload()
  }
  const [
    user,
    result,
    setResult,
    onSubmit,
  ] = useEditForm('update profile picture', onSuccess)
  const [image, setImage] = useState()

  const handleImageUpload = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <>
      <Form
        method="PATCH"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <input type="hidden" name='type' value='update'/>
        <input
          className={styles.input}
          type="file"
          name="profilePicture"
          id='profilePicture'
          accept=".jpg, .jpeg, .png"
          multiple={false}
          onChange={handleImageUpload}
          required
        />
        <div className={styles.uploadBox}>
          <label className={styles.upload} htmlFor="profilePicture">
            updload
          </label>
          <span className={styles.filename}>
            {image ? image.name : 'Nothing is uploaded yet'}
          </span>
        </div>
        <div className={result.classes.join(' ')}>{result.value}</div>
        <div className={commonStyles.btnBox}>
          <Button type='submit' text='update'/>
        </div>
      </Form>
      <Form className={styles.resetForm} method="PATCH" onSubmit={onSubmit}>
        <input type="hidden" name="type" value="reset"/>
        <button
          className={styles.reset}
          type='submit'
        >reset
        </button>
      </Form>
    </>
  )
}

export default Avatar