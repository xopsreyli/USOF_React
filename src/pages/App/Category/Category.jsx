import styles from './Category.module.css'
import {useLoaderData} from 'react-router-dom'
import Posts from '../../../components/Posts/Posts.jsx'
import Pagination from '../../../components/Pagination/Pagination.jsx'
import Sorter from '../../../components/Sorter/Sorter.jsx'
import Select from '../../../components/Select/Select.jsx'
import Filter from '../../../components/Filter/Filter.jsx'
import DateInput from '../../../components/Inputs/DateInput/DateInput.jsx'

const Category = () => {
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
      <div className={styles.info}>
        <h1 className={styles.title}>{loaderData.categoryResponse.category.title}</h1>
        <p className={styles.description}>{loaderData.categoryResponse.category.description}</p>
        <div className={styles.stats}>
          <span className={styles.numberOfPosts}>{loaderData.categoryResponse.category.numberOfPosts}</span>
          <span>posts</span>
        </div>
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
      <Posts posts={loaderData.postsResponse.posts} />
      <Pagination isNext={loaderData.postsResponse.posts.length === 10} />
    </>
  )
}

export default Category