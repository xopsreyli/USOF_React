import Posts from '../../../../components/Posts/Posts.jsx'
import {useEffect} from 'react'
import {useLoaderData, useOutletContext} from 'react-router-dom'
import Pagination from '../../../../components/Pagination/Pagination.jsx'
import useAuth from '../../../../hooks/useAuth.js'
import hasPermission from '../../../../utils/permissions.js'

const Favorites = () => {
  const { user } = useAuth()
  const [data, setTitle] = useOutletContext()
  const loaderData = useLoaderData()

  useEffect(() => {
    setTitle('favorites')
  }, [])

  if (!hasPermission(user, 'view:favorites', data.user.id)) {
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
      <Posts posts={loaderData.posts} />
      <Pagination isNext={loaderData.posts.length === 10} />
    </>
  )
}

export default Favorites