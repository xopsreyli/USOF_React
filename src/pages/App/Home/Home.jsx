import styles from './Home.module.css'
import Greet from '../../../components/SVGs/Greet/Greet.jsx'
import {useLoaderData} from 'react-router-dom'
import Posts from '../../../components/Posts/Posts.jsx'

const Home = () => {
  const loaderData = useLoaderData()

  return (
    <>
      <h1 className={styles.title}>
        <Greet className={styles.titleSVG}/>
        <span className={styles.titleText}>Welcome to USOF</span>
      </h1>
      <p className={styles.introduction}>
        {`
          Here, you can ask questions, provide answers, and explore a variety of categories to help you solve your coding
        challenges. Whether you're a beginner or an expert, you'll find a space to grow, share knowledge, and connect
        with others. Browse through topics that interest you, post your own questions, and contribute answers to help
        others. With every interaction, you’ll not only improve your skills but also earn reputation points within our
        community. Get involved, collaborate, and make the most of the vast pool of knowledge available to you!
        `}
      </p>
      <h2 className={styles.postsTitle}>recent posts:</h2>
      <Posts posts={loaderData.posts} />
    </>
  )
}

export default Home