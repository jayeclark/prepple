import { useContext } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import LandingPage from "../components/LandingPage"
import NewsAndInfo from "../components/NewsAndInfo"
import Welcome from "../components/Welcome"
import { UserContext } from '../scripts/context'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Prepple</title>
        <meta name="description" content="Video interview simulator with some wildcards thrown in." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!user.email && <LandingPage />}
        {user.email && <Welcome id={user.id} username={user.username} />}
        <NewsAndInfo />
      </main>

      <style jsx>{`
        .question {
          width: calc(min(72vh, 72vw));
          height: calc(min(54vh, 54vw) + 182px);
          min-width: calc(min(72vh, 72vw));
          min-height: calc(min(54vh, 54vw) + 182px);
          max-width: 1600px;
          max-height: calc(min(1200px, 100vh - 120));
        }
        .buttons {
          display: flex!important:
          flex-wrap: nowrap;
          width: 100%;
          flex-wrap: nowrap;
          justify-content: space-between;
          justify-items: space-between;
          align-content: center;
          align-items: center;
        }
        .options {
          padding: 0px 0px 16px 0px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: calc(min(72vh, 72vw));
          min-width: calc(min(72vh, 72vw));
          max-width: 1600px;
        }
      `}</style>
    </div>
  )
}

export default Home
