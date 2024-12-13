import styles from './Categories.module.css'
import {useLoaderData} from 'react-router-dom'
import Category from '../../../components/Category/Category.jsx'
import Pagination from '../../../components/Pagination/Pagination.jsx'
import CategorySVG from '../../../components/SVGs/Category/Category.jsx'
import Sorter from '../../../components/Sorter/Sorter.jsx'
import Select from '../../../components/Select/Select.jsx'

const Categories = () => {
  const loaderData = useLoaderData()

  const sortByNumberOfPosts = (
    <Select
      displayName="sort by posts"
      paramName='numberOfPosts'
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

  return (
    <>
      <h1 className={styles.title}>
        <CategorySVG className={styles.titleSVG} />
        <span className={styles.titleText}>categories</span>
      </h1>
      <Sorter title='sort categories' items={[sortByNumberOfPosts]} />
      <div className={styles.box}>
        {loaderData.categories.map(c => <Category key={c.id} category={c}/>)}
      </div>
      <Pagination isNext={loaderData.categories.length === 12} />
    </>
  )
}

export default Categories