import styles from './UpdatePost.module.css'
import {Form, useActionData, useLoaderData, useNavigate, useParams} from 'react-router-dom'
import useAuth from '../../../hooks/useAuth.js'
import usePersistedState from '../../../hooks/usePersistedState.js'
import {useEffect, useState} from 'react'
import getCategories from '../../../requests/common/App/CreatePost/getCategories.js'
import hasPermission from '../../../utils/permissions.js'
import WriteNew from '../../../components/SVGs/WriteNew/WriteNew.jsx'
import Input from '../../../components/Inputs/Input/Input.jsx'
import TextArea from '../../../components/Inputs/TextArea/TextArea.jsx'
import Close from '../../../components/SVGs/Close/Close.jsx'
import Button from '../../../components/Button/Button.jsx'

const UpdatePost = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {user} = useAuth()
  const loaderData = useLoaderData()
  const [title, setTitle] = usePersistedState('title', loaderData.post.title)
  const [content, setContent] = usePersistedState('content', loaderData.post.content)
  const [status, setStatus] = usePersistedState('status', loaderData.post.status === 'active')
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const [pickedCategories, setPickedCategories] = usePersistedState('categories', loaderData.post.categories)
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
      navigate(`/post/${id}`, {replace: true})
    }
  }, [actionData])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleStatusChange = () => {
    setStatus(status => !status)
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

  if (!hasPermission(user, 'update:post', loaderData.post.author.id)) {
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
        <span className={styles.titleText}>Update post</span>
      </h1>
      <Form
        className={styles.form}
        method='POST'
      >
        <input
          type="hidden"
          name='ogTitle'
          value={loaderData.post.title}
        />
        <Input
          name='title'
          value={title}
          isRequired
          placeholder='Title'
          onChange={handleTitleChange}
        />
        <input
          type="hidden"
          name='ogContent'
          value={loaderData.post.content}
        />
        <TextArea
          name='content'
          value={content}
          onChange={handleContentChange}
          placeholder='add some details'
          isRequired
        />
        <div className={styles.statusBox}>
          <p className={styles.label}>status:</p>
          <div
            className={styles.status}
            onClick={handleStatusChange}
          >
            <span
              className={[
                styles.statusItem,
                styles.statusActive,
              ].join(' ')}
            >active</span>
            <span
              className={[
                styles.statusItem,
                styles.statusInactive,
              ].join(' ')}
            >inactive</span>
            <div className={[
              styles.statusIndicator,
              status && styles.statusIndicatorTranslated,
            ].join(' ')}></div>
          </div>
        </div>
        <input
          type="hidden"
          name='status'
          value={status}
        />
        <input
          type="hidden"
          name='originalCategories'
          value={loaderData.post.categories.map(c => c.id).join(',')}
        />
        <input
          type="hidden"
          name='updatedCategories'
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
            <p className={styles.label}>categories:</p>
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
          <Button type='submit' text="update"/>
        </div>
      </Form>
    </>
  )
}

export default UpdatePost