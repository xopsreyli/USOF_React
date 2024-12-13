import styles from './Post.module.css'
import {Form, Link, useActionData, useLoaderData, useNavigate} from 'react-router-dom'
import Save from '../../../components/SVGs/Save/Save.jsx'
import {useEffect, useState} from 'react'
import removeFromFavorites from '../../../requests/common/App/Post/removeFromFavorites.js'
import addToFavorites from '../../../requests/common/App/Post/addToFavorites.js'
import Reactions from '../../../components/Reactions/Reactions.jsx'
import useAuth from '../../../hooks/useAuth.js'
import like from '../../../requests/common/App/Post/like.js'
import unlike from '../../../requests/common/App/Post/unlike.js'
import Avatar from '../../../components/Avatar/Avatar.jsx'
import Comment from '../../../components/Comment/Comment.jsx'
import Input from '../../../components/Inputs/Input/Input.jsx'
import usePersistedState from '../../../hooks/usePersistedState.js'
import Button from '../../../components/Button/Button.jsx'
import deletePost from '../../../requests/common/App/Post/deletePost.js'
import hasPermission from '../../../utils/permissions.js'

const Post = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const {
    postResponse,
    likesResponse,
    favoritesResponse,
    commentsResponse,
  } = useLoaderData()
  const [saved, setSaved] = useState(favoritesResponse?.posts?.some(p => p.id === postResponse.post.id))
  const [likes, setLikes] = useState({
    likes: 0,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
  })
  const [comment, setComment] = usePersistedState('comment', '')
  const actionData = useActionData()

  useEffect(() => {
    const likes = likesResponse.likes.filter(l => l.type === 'like')
    const dislikes = likesResponse.likes.filter(l => l.type === 'dislike')

    const userReaction = likesResponse.likes.find(l => l.author.id === user?.id)
    const isLiked = userReaction?.type === 'like'
    const isDisliked = userReaction?.type === 'dislike'

    setLikes({
      likes: likes.length,
      dislikes: dislikes.length,
      isLiked: isLiked,
      isDisliked: isDisliked,
    })
  }, [])

  useEffect(() => {
    if (actionData?.status === 200) {
      setComment('')
    }
  }, [actionData])

  const handleLike = async (isLike) => {
    const response = await like(postResponse.post.id, isLike)

    if (response.status === 200) {
      setLikes(likes => ({
        likes: isLike ? likes.likes + 1 : likes.likes,
        dislikes: !isLike ? likes.dislikes + 1 : likes.dislikes,
        isLiked: isLike,
        isDisliked: !isLike,
      }))
    }
  }

  const handleUnlike = async () => {
    const response = await unlike(postResponse.post.id)

    if (response.status === 200) {
      setLikes(likes => ({
        likes: likes.isLiked ? likes.likes - 1 : likes.likes,
        dislikes: likes.isDisliked ? likes.dislikes - 1: likes.dislikes,
        isLiked: false,
        isDisliked: false,
      }))
    }
  }
  
  const handleSave = async () => {
    const response = saved ?
      await removeFromFavorites(postResponse.post.id) :
      await addToFavorites(postResponse.post.id)

    if (response.status === 200) {
      setSaved(saved => !saved)
    }
  }

  const handleDelete = async () => {
    const confirmation = confirm('Are you sure you want to delete post?')

    if (confirmation) {
      const result = await deletePost(postResponse.post.id)

      if (result.status === 200) {
        navigate('/', {replace: true})
      }
    }
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {postResponse.post.title}
        </h1>
        <div className={styles.headerInfo}>
          <div className={styles.headerInfoItem}>
            <span className={styles.headerInfoLabel}>rating:</span>
            <span className={styles.headerInfoValue}>
              {postResponse.post.rating}
            </span>
          </div>
          <div className={styles.headerInfoItem}>
            <span className={styles.headerInfoLabel}>posted:</span>
            <span className={styles.headerInfoValue}>
              {
                postResponse.post.publishDate.slice(0, 10)
                  .split('-')
                  .reverse()
                  .join('.')
              }
            </span>
          </div>
          <div className={styles.headerInfoItem}>
            <span className={styles.headerInfoLabel}>status:</span>
            <span
              className={[
                styles.headerInfoValue,
                postResponse.post.status === 'active' ?
                  styles.statusActive :
                  styles.statusInacative
              ].join(' ')}
            >
              {postResponse.post.status}
            </span>
          </div>
        </div>
      </div>
      <p className={styles.content}>
        {postResponse.post.content}
      </p>
      <div className={styles.categories}>
        {postResponse.post.categories.map(c => (
          <Link
            to={`/category/${c.id}`}
            key={c.id}
            className={styles.category}
          >
            <span className={styles.categoryName}>{c.title}</span>
          </Link>
        ))}
      </div>
      <div className={styles.reactions}>
        <Reactions
          likes={likes.likes}
          dislikes={likes.dislikes}
          isLiked={likes.isLiked}
          isDisliked={likes.isDisliked}
          onLike={handleLike}
          onUnlike={handleUnlike}
        />
        {
          hasPermission(user, 'view:addToFavorites') &&
          <button
            className={styles.save}
            onClick={handleSave}
          >
            <Save
              className={
                saved ? styles.saveSVGActive : styles.saveSVG
              }
            />
          </button>
        }
      </div>
      <div className={styles.authorBox}>
        <Link
          to={`/profile/${postResponse.post.author.id}`}
          className={styles.author}
        >
          <span className={styles.authorLogin}>{postResponse.post.author.login}</span>
          <div className={styles.authorAvatarBox}>
            <Avatar name={postResponse.post.author.profilePicture} />
          </div>
        </Link>
      </div>
      {
        hasPermission(user, 'view:postManageBtn', postResponse.post.author.id) &&
        <div className={styles.manage}>
          <Link
            to={`/post/${postResponse.post.id}/update`}
            className={styles.update}
          >
            update
          </Link>
          <button
            className={styles.delete}
            onClick={handleDelete}
          >delete
          </button>
        </div>
      }
      {
        hasPermission(user, 'view:commentForm') &&
        <Form
          method="POST"
          className={styles.commentForm}
        >
          <Input
            name="comment"
            value={comment}
            isRequired
            onChange={handleCommentChange}
            placeholder="enter comment"
          />
          <div className={styles.commentFormBtn}>
            <Button
              type='submit'
              text='leave comment'
            />
          </div>
        </Form>
      }
      <div className={styles.comments}>
        {
          commentsResponse.comments.map(c => (
            <Comment
              key={c.id}
              comment={c}
              user={user}
            />
          ))
        }
      </div>
    </>
  )
}

export default Post