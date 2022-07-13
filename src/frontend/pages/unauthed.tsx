import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import SignInForm from '../components/SignInForm'
import { getQuestionIDs, getQuestion } from '../scripts/queries'
import { useTheme, Button } from '@mui/material/'
import styles from '../styles/Home.module.css'

const Authed: NextPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [showSignIn, setShowSignIn] = useState(false)

  const handleSetShowSignIn = (bool: boolean) => {
    setShowSignIn(bool)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>My Dev Interview</title>
        <meta name="description" content="Video interview simulator with some wildcards thrown in." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className="question">
          <p>You need to be logged in to access that content! </p>
          <p><Button onClick={() => setShowSignIn(true)}>Sign In</Button> or <Button onClick={() => router.push("/")}>Go Home</Button></p>

        </section>
      </main>
      <SignInForm showSignIn={showSignIn} setShowSignIn={handleSetShowSignIn} />
      <style jsx>{`
        .question {
          width: calc(min(72vh, 72vw));
          height: calc(min(54vh, 54vw) + 182px);
          min-width: calc(min(72vh, 72vw));
          min-height: calc(min(54vh, 54vw) + 182px);
          max-width: 1600px;
          max-height: calc(min(1200px, 100vh - 120));
          padding: calc(min(10vh, 10vw));
          text-align: center;
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

export default Authed
