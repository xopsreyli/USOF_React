import styles from './Posts.module.css'
import {useLoaderData} from 'react-router-dom'
import PostsSVG from '../../../components/SVGs/Posts/Posts.jsx'
import Pagination from '../../../components/Pagination/Pagination.jsx'
import Sorter from '../../../components/Sorter/Sorter.jsx'
import Select from '../../../components/Select/Select.jsx'
import PostsBox from '../../../components/Posts/Posts.jsx'
import Filter from '../../../components/Filter/Filter.jsx'
import DateInput from '../../../components/Inputs/DateInput/DateInput.jsx'
import AskQuestionBtn from '../../../components/AskQuestionBtn/AskQuestionBtn.jsx'
import hasPermission from '../../../utils/permissions.js'
import useAuth from '../../../hooks/useAuth.js'

const Posts = () => {
  const {user} = useAuth()
  const loaderData = useLoaderData()

  const sortByRating = (
    <Select
      displayName="sort by rating"
      paramName='rating'
      values={[
        {
          value: 'ASC',
          displayValue: 'fewest first'
        },
        {
          value: 'DESC',
          displayValue: 'most first'
        },
      ]}
    />
  )

  const sortByDate = (
    <Select
      displayName="sort by date"
      paramName='date'
      values={[
        {
          value: 'ASC',
          displayValue: 'oldest first'
        },
        {
          value: 'DESC',
          displayValue: 'newest first'
        },
      ]}
    />
  )

  const sortByStatus = (
    <Select
      displayName="sort by status"
      paramName='status'
      values={[
        {
          value: 'active',
          displayValue: 'active'
        },
        {
          value: 'inactive',
          displayValue: 'inactive'
        },
      ]}
    />
  )

  const filterFrom = (
    <DateInput
      label='start date:'
      name="dateFrom"
      paramName='from'
    />
  )

  const filterTo = (
    <DateInput
      label='end date:'
      name="dateTo"
      paramName='to'
    />
  )

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <PostsSVG className={styles.titleSVG}/>
          <span className={styles.titleText}>posts</span>
        </h1>
        {hasPermission(user, 'create:post') && <AskQuestionBtn />}
      </div>
      <Sorter
        title='sort posts'
        items={[
          sortByRating,
          sortByDate,
          sortByStatus,
        ]}
      />
      <Filter
        items={[
          filterFrom,
          filterTo,
        ]}
      />
      <PostsBox posts={loaderData.posts} />
      <Pagination isNext={loaderData.posts.length === 10}/>
    </>
  )
}

export default Posts