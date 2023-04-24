import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import axios from 'axios'
import Head from 'next/head'
import styles from '../../../../styles/Home.module.css'
import { API_URL } from '../../..'
import { UserContext } from "../../../../scripts/context"

const Authed: NextPage = () => {
  const router = useRouter();
  const { handleSetUser } = useContext(UserContext);

  const authGitHubUser = async () => {
    const query = router.query
    if ("access_token" in query) {
      const response = await axios.get(`${API_URL}/api/auth/github/callback`, { params: { access_token: query.access_token }})
      const data = await response.data
      handleSetUser({
            email: data.user.email,
            jwt: data.jwt,
            username: data.user.username,
            id: data.user.id
      })
      localStorage.setItem('mdi-session-access-token', data.jwt)
      router.push("/")
    }
  }

  useEffect(() => { authGitHubUser() })

  return (
    <div className={styles.container}>
      <Head>
        <title>My Dev Interview</title>
        <meta name="description" content="Video interview simulator with some wildcards thrown in." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className="question">
          Congrats! You have successfully logged in. Please wait while you are directed back to the main application.
        </section>
      </main>
      <style jsx>{`
        .question {
          width: calc(min(72vh, 72vw));
          height: calc(min(54vh, 54vw) + 182px);
          min-width: calc(min(72vh, 72vw));
          min-height: calc(min(54vh, 54vw) + 182px);
          max-width: 1600px;
          max-height: calc(min(1200px, 100vh - 120));
          padding: 10vh;
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
