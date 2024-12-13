import styles from './Comment.module.css'
import Avatar from '../Avatar/Avatar.jsx'
import {useEffect, useState} from 'react'
import getCommentLikes from '../../requests/common/App/Post/getCommentLikes.js'
import Reactions from '../Reactions/Reactions.jsx'
import likeComment from '../../requests/common/App/Post/likeComment.js'
import unlikeComment from '../../requests/common/App/Post/unlikeComment.js'
import Trash from '../SVGs/Trash/Trash.jsx'
import deleteComment from '../../requests/common/App/Post/deleteComment.js'
import hasPermission from '../../utils/permissions.js'
import useAuth from '../../hooks/useAuth.js'

const Comment = ({comment, user}) => {
  const [likesResponse, setLikesResponse] = useState()
  const [likes, setLikes] = useState({
    likes: 0,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
  })

  useEffect(() => {
    const getLikes = async () => {
      const response = await getCommentLikes(comment.id)

      setLikesResponse(response.likes)
    }

    getLikes()
  }, [comment])

  useEffect(() => {
    const likes = likesResponse?.filter(l => l.type === 'like')
    const dislikes = likesResponse?.filter(l => l.type === 'dislike')

    const userReaction = likesResponse?.find(l => l.author.id === user?.id)
    const isLiked = userReaction?.type === 'like'
    const isDisliked = userReaction?.type === 'dislike'

    setLikes({
      likes: likes?.length,
      dislikes: dislikes?.length,
      isLiked: isLiked,
      isDisliked: isDisliked,
    })
  }, [likesResponse])

  const handleLike = async (isLike) => {
    const response = await likeComment(comment.id, isLike)

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
    const response = await unlikeComment(comment.id)

    if (response.status === 200) {
      setLikes(likes => ({
        likes: likes.isLiked ? likes.likes - 1 : likes.likes,
        dislikes: likes.isDisliked ? likes.dislikes - 1: likes.dislikes,
        isLiked: false,
        isDisliked: false,
      }))
    }
  }

  const handleDelete = async () => {
    const response = await deleteComment(comment.id)

    if (response.status === 200) {
      window.location.reload()
    }
  }

  return (
    <div className={styles.comment} key={comment.id}>
      <div className={styles.commentHeader}>
        <div className={styles.commentAuthor}>
          <div className={styles.commentAuthorAvatar}>
            <Avatar name={comment.author.profilePicture}/>
          </div>
          <span>{comment.author.login}</span>
        </div>
        <span className={styles.commentDate}>{comment.publishDate.slice(0, 10).split('-').reverse().join('.')}</span>
      </div>
      <p className={styles.commentContent}>{comment.content}</p>
      <div className={styles.commentFooter}>
        <div>
          {
            hasPermission(user, 'delete:ownComment', comment.author.id) &&
            <button className={styles.deleteBtn} onClick={handleDelete}>
              <Trash className={styles.deleteSVG}/>
            </button>
          }
        </div>
        <Reactions
          likes={likes.likes}
          dislikes={likes.dislikes}
          isLiked={likes.isLiked}
          isDisliked={likes.isDisliked}
          onLike={handleLike}
          onUnlike={handleUnlike}
        />
      </div>
    </div>
  )
}

export default Comment