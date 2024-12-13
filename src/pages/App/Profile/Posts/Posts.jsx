import {useLoaderData, useOutletContext} from 'react-router-dom'
import {useEffect} from 'react'
import Pagination from '../../../../components/Pagination/Pagination.jsx'
import PostsBox from '../../../../components/Posts/Posts.jsx'

const Posts = () => {
  const [data, setTitle] = useOutletContext()
  const loaderData = useLoaderData()

  useEffect(() => {
    setTitle('posts')
  }, [])

  return (
    <>
      <PostsBox posts={loaderData.posts} />
      <Pagination isNext={loaderData.posts.length === 10} />
    </>
  )
}

export default Posts