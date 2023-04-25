import { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import QuestionList from "../components/QuestionList"
import { getVideos, GraphQLQueryResponseData, QuestionAttributes } from '../scripts/queries';
import { UserContext } from '../scripts/context'
import styles from '../styles/Home.module.css'
import { API_URL } from '../constants/app'
import { PlanCatalogEntry, VideoCatalogEntry } from '../types/records';

export default function Videos() {

  const { user } = useContext(UserContext);
  const initialCatalog: Array<PlanCatalogEntry> = [];
  const [catalog, setCatalog] = useState(initialCatalog);
  const [activeRecords, setActiveRecords] = useState([{} as GraphQLQueryResponseData]);

  const handleSetActiveRecords = (id: string) => {
    const question = catalog?.find((q: PlanCatalogEntry) => q.plans.some((x: GraphQLQueryResponseData) => x.id === id))?.question as GraphQLQueryResponseData;
    setActiveRecords([question]);
  }
  
  const getS3Key = (id: string) => {
    const plans = catalog?.find((q: PlanCatalogEntry) => q.plans.some((x: GraphQLQueryResponseData) => x.id === id))?.plans as GraphQLQueryResponseData[];
    const key = plans?.find((x: GraphQLQueryResponseData) => x.id === id)?.attributes?.s3key || "key";
    return key;
  }
  const handleSetCatalog = (newCatalog: Array<PlanCatalogEntry>) => {
    setCatalog(newCatalog);
  }

  const handleGetVideos = async (userId: string) => {
    const request = {
        query: getVideos,
        variables: {
          id: userId,
          archive: false
        }
      }
    const result = await fetch(`${API_URL}/graphql`, {
      headers: {
        Authorization: `Bearer ${user.jwt}`,
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(request)
    })
    const parsed = await result.json()
    const answers = await parsed.data.answers
    return answers.data;
  }

  useEffect(() => {
    if (user.jwt === '') {
      Router.push("/");
    }
  
    if (catalog.length === 0) {
      handleGetVideos(user.id).then((res) => {
        if (res.length > 0) {  
          const sorted = res.sort((a: GraphQLQueryResponseData, b: GraphQLQueryResponseData) => {
            const questionA = a.attributes.question
            const questionB = b.attributes.question
            if (((questionB?.data as GraphQLQueryResponseData).attributes.category || 0) < ((questionA?.data as GraphQLQueryResponseData).attributes.category || 0)) {
              return 1
            }
            if (((questionB?.data as GraphQLQueryResponseData).attributes.category || 0) > ((questionA?.data as GraphQLQueryResponseData).attributes.category || 0)) {
              return -1
            }
            return 0
          });
          const reduced = sorted.reduce((coll: PlanCatalogEntry[], item: GraphQLQueryResponseData) => {
            const index = coll.findIndex((x: PlanCatalogEntry) => x.qid === (item.attributes.question?.data as GraphQLQueryResponseData).id);
            const videos = (item.attributes.videos?.data as GraphQLQueryResponseData[])
            const title = item.attributes.title
            const question = item.attributes.question
            if (index >= 0) {
              coll[index].plans.push(...videos?.filter((x: GraphQLQueryResponseData) => x.attributes.archive === false).map((x: GraphQLQueryResponseData) => {
                const newX = {
                  ...x,
                  title,
                  question,
                }
                return newX;
              }))
            } else {
              coll.push({
                qid: (item.attributes.question?.data as GraphQLQueryResponseData).id,
                question: (item.attributes.question?.data as GraphQLQueryResponseData).attributes.question as QuestionAttributes,
                plans: [...videos.filter((x: GraphQLQueryResponseData) => x.attributes.archive === false).map((x: GraphQLQueryResponseData) => {
                  const newX = {
                    ...x,
                    title,
                    question,
                  }
                return newX;
              })]
              }) 
            }
            return coll;
          }, [])
          setCatalog(reduced);
          }
      })
    }

  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Prepple - Video Interview Practice App</title>
        <meta name="description" content="Video interview simulator with some wildcards thrown in." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className="videos">
          <h1>My Saved Videos</h1>
          {catalog?.length > 0 ? (
            <QuestionList
              catalog={catalog}
              setCatalog={handleSetCatalog as ((c: PlanCatalogEntry[] | VideoCatalogEntry[]) => void)}
              listStyle="videos"
              activeRecords={activeRecords}
              setActiveRecords={handleSetActiveRecords}
            />
          ) : "You have not recorded any videos yet. Once you record your first video answer, it will appear here for you to review & manage."}
        </section>
        <section className="viewer">
          <h1>&nbsp;</h1>
          <video src={activeRecords[0] ? `https://d1lt2f6ccu4rh4.cloudfront.net/${getS3Key(activeRecords[0]?.attributes?.s3key || "key")}` : ''} controls autoPlay><track kind="captions" /></video>
        </section>
      </main>
      <style jsx>{`
        main {
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          align-items: flex-start;
        }
        .videos {
          width: calc(40vw - 4rem - 16px);
          margin-right: 2rem;
          max-height: calc(100vh - 67px);
          overflow-y: scroll;
        }
        .viewer {
          width: calc(60vw - 2rem - 16px);
        }
        .viewer video {
          height: calc(0.75 * (60vw - 2rem - 16px));
          width: 100%;
          max-width: 100%;
          border-radius: 6px;
        }
        @media only screen and (max-width: 700px) {
          main {
            flex-wrap: wrap-reverse;
            flex-direction: row!important;
            overflow: scroll!important;
            justify-content: flex-start!important;
          }
          .videos {
            width: 100%;
            margin-right: 0;
            max-height: calc(50vh - 8px);
            overflow: hidden;
          }
          .viewer {
            width: calc(100vw - 2rem);
          }

          .viewer video {
            height: calc(0.75 * (100vw - 2rem));
          }
        }
      `}</style>
    </div>
  )
}
