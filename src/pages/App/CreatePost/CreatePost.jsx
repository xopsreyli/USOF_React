import styles from './CreatePost.module.css'
import WriteNew from '../../../components/SVGs/WriteNew/WriteNew.jsx'
import {Form, useActionData, useNavigate} from 'react-router-dom'
import Input from '../../../components/Inputs/Input/Input.jsx'
import Button from '../../../components/Button/Button.jsx'
import TextArea from '../../../components/Inputs/TextArea/TextArea.jsx'
import {useEffect, useState} from 'react'
import Close from '../../../components/SVGs/Close/Close.jsx'
import getCategories from '../../../requests/common/App/CreatePost/getCategories.js'
import usePersistedState from '../../../hooks/usePersistedState.js'
import useAuth from '../../../hooks/useAuth.js'
import hasPermission from '../../../utils/permissions.js'

const CreatePost = () => {
  const navigate = useNavigate()
  const {user} = useAuth()
  const [title, setTitle] = usePersistedState('title', '')
  const [content, setContent] = usePersistedState('content', '')
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const [pickedCategories, setPickedCategories] = usePersistedState('categories', [])
  const actionData = useActionData()

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories(categoryName)
      setCategories(result.categories)
    }

    if (categoryName.length >= 3) {
      fetchCategories()
    }
  }, [categoryName])

  useEffect(() => {
    if (actionData?.status === 200) {
      navigate(`/post/${actionData.id}`, {replace: true})
    }
  }, [actionData])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value)
  }

  const handlePickCategory = (category) => {
    setPickedCategories(pickedCategories => {
      return pickedCategories.map(c => c.id).includes(category.id) ?
        pickedCategories :
        [...pickedCategories, category]
    })

    setCategoryName('')
    setCategories([])
  }

  const handleRemoveCategory = (category) => {
    setPickedCategories(pickedCategories =>
      pickedCategories.filter(c => c.id !== category.id)
    )
  }

  if (!hasPermission(user, 'create:post')) {
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
      <h1 className={styles.title}>
        <WriteNew className={styles.titleSVG} />
        <span className={styles.titleText}>Ask a question</span>
      </h1>
      <Form
        className={styles.form}
        method='POST'
      >
        <Input
          name='title'
          value={title}
          isRequired
          placeholder='Title'
          onChange={handleTitleChange}
        />
        <TextArea
          name='content'
          value={content}
          onChange={handleContentChange}
          placeholder='add some details'
          isRequired
        />
        <input
          type="hidden"
          name='categories'
          value={pickedCategories.map(c => c.id).join(',')}
        />
        <div className={styles.categories}>
          <div className={styles.categoryInput}>
            <Input
              name='category'
              value={categoryName}
              isRequired={false}
              placeholder='search category'
              onChange={handleCategoryNameChange}
            />
          </div>
          <div className={styles.searchCategories}>
            {categories.map(c => (
              <div
                className={styles.searchCategory}
                key={c.id}
                onClick={() => handlePickCategory(c)}
              >
                <div className={styles.searchCategoryHeader}>
                  <span className={styles.searchCategoryTitle}>{c.title}</span>
                  <span className={styles.searchCategoryNumberOfPosts}>{c.numberOfPosts}</span>
                </div>
                <p className={styles.searchCategoryDescription}>{c.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickedCategoriesBox}>
            <p className={styles.pickedCategoriesLabel}>categories:</p>
            <div className={styles.pickedCategories}>
              {pickedCategories.map(c => (
                <div
                  className={styles.categoryBox}
                  key={c.id}
                >
                  <span className={styles.categoryName}>{c.title}</span>
                  <div onClick={() => handleRemoveCategory(c)}>
                    <Close className={styles.closeSVG}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.error}>
          {actionData?.message}
        </div>
        <div className={styles.btnBox}>
          <Button type='submit' text="create" />
        </div>
      </Form>
    </>
  )
}

export default CreatePost