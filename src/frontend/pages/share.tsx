import { useState, useContext, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { nanoid } from 'nanoid'
import axios from 'axios'
import QuestionList from "../components/QuestionList"
import { useTheme, Snackbar, Dialog, FormGroup, FormControlLabel, Switch, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { getVideos, GraphQLQueryResponseData, QuestionAttributes } from '../scripts/queries';
import { UserContext } from '../scripts/context'
import styles from '../styles/Home.module.css'
import close from '../assets/x-lg.svg'
import { API_URL } from '.'
import { VideoCatalogEntry } from './plan';

export default function Share() {

  const { user } = useContext(UserContext);
  const theme = useTheme();
  const initialCatalog: Array<VideoCatalogEntry> = [];
  const [catalog, setCatalog] = useState(initialCatalog);
  const [activeRecords, setActiveRecords] = useState([{} as GraphQLQueryResponseData]);
  const [shareMode, setShareMode] = useState('single')
  const [requestFeedback, setRequestFeedback] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastLink, setLastLink] = useState('');
  const [confirmCopy, setConfirmCopy] = useState(false);

  const handleSetActiveRecords = (id: string) => {
    const videos = catalog.find((x: VideoCatalogEntry) => x.videos.some((v: GraphQLQueryResponseData) => v.id === id))?.videos;
    const video = videos?.filter((x: GraphQLQueryResponseData) => x.id === id)[0];
      
    if (shareMode == "single" || activeRecords[0].id == undefined) {
      setActiveRecords([video as GraphQLQueryResponseData])
    } else if (activeRecords.some((x: GraphQLQueryResponseData) => x.id === id)) {
      const newRecords = activeRecords.filter((x: GraphQLQueryResponseData) => x.id !== id)
      setActiveRecords(newRecords.length == 1 ? newRecords : [{} as GraphQLQueryResponseData])
    } else if (activeRecords.length == 2) {
      setActiveRecords([activeRecords[1], video as GraphQLQueryResponseData])
    } else {
      setActiveRecords([activeRecords[0], video as GraphQLQueryResponseData])
    }
  }
  
  const getS3Key = (id: string) => {
    const records = catalog.find((q: VideoCatalogEntry) => q.videos.some((x: GraphQLQueryResponseData) => x.id == id))?.videos;
    const key = records?.find((x: GraphQLQueryResponseData) => x.id == id)?.attributes.s3key
    return key;
  }
  const handleSetCatalog = (newCatalog: Array<VideoCatalogEntry>) => {
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
  
    if (catalog.length == 0) {
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
          const reduced = sorted.reduce((coll: VideoCatalogEntry[], item: GraphQLQueryResponseData) => {
            const index = coll.findIndex((x: VideoCatalogEntry) => x.qid == (item.attributes.question?.data as GraphQLQueryResponseData).id);
            const videos = item?.attributes?.videos?.data
            const title = item.attributes.title
            const question = item.attributes.question
            if (index >= 0) {
              coll[index].videos.push(...(videos as GraphQLQueryResponseData[]).filter((x: GraphQLQueryResponseData) => x.attributes.archive === false).map((x: GraphQLQueryResponseData) => {
                const newX = {
                  ...x,
                  title,
                  question,
                }
                return newX;
              }))
            } else {
              coll.push({
                qid: (item?.attributes?.question?.data as GraphQLQueryResponseData).id,
                question: (item?.attributes?.question?.data as GraphQLQueryResponseData).attributes.question as QuestionAttributes,
                videos: [...(videos as GraphQLQueryResponseData[]).filter((x: GraphQLQueryResponseData) => x.attributes.archive === false).map((x: GraphQLQueryResponseData) => {
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

  const handleChange = () => {
    setRequestFeedback(!requestFeedback);
  }

  const handleShareChange = (e: React.MouseEvent<HTMLElement>) => {
    const element: HTMLInputElement = e.target as HTMLInputElement
    setShareMode(element.value);
    if (element.value == "single" && activeRecords.length == 2) {
      setActiveRecords([activeRecords[0]])
    }
  }

  const createLink = async() => {
    const slug = nanoid(8)
    const data = {
      slug,
      videos: [...activeRecords],
      "users_permissions_user": user.id,
      user_id: user.id,
      feedback: requestFeedback
    }
    const headers = {
      Authorization: `Bearer ${user.jwt}`
    }
    await axios.post(`${API_URL}/api/links`, { data }, { headers }).then((res) => {
      setLastLink(slug);
      setShowConfirmation(true);
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>My Dev Interview - Video Interview Practice App</title>
        <meta name="description" content="Video interview simulator with some wildcards thrown in." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className="videos">
          <h1>My Saved Videos</h1>
          {catalog?.length > 0 ? (
            <QuestionList
              catalog={catalog}
              setCatalog={handleSetCatalog}
              style="videos"
              activeRecords={activeRecords}
              setActiveRecords={handleSetActiveRecords}
            />
          ) : "You have not recorded any videos yet. Once you record your first video answer, it will appear here for you to review & manage."}
        </section>
        <section className={shareMode == "single" ? "viewer" : "viewer-double"}>
          <h1>Create a Video Share Link</h1>
          <div className="toggle-buttons">
            <ToggleButtonGroup
              color="primary"
              value={shareMode}
              sx={{ pr: 2 }}
              exclusive
              onChange={(e: React.MouseEvent<HTMLElement>) => handleShareChange(e)}
            >
              <ToggleButton value="single">Single Video</ToggleButton>
              <ToggleButton value="side-by-side">Side-by-Side</ToggleButton>
            </ToggleButtonGroup>
            <FormGroup>
              <FormControlLabel control={<Switch checked={requestFeedback} onChange={handleChange} />} label="Request Feedback" />
            </FormGroup>
          </div>

          <video src={activeRecords[0] ? `https://d1lt2f6ccu4rh4.cloudfront.net/${getS3Key(activeRecords[0].id)}` : ''} controls autoPlay />
          {shareMode == "side-by-side" && <video className="ml-2" src={activeRecords[1] ? `https://d1lt2f6ccu4rh4.cloudfront.net/${getS3Key(activeRecords[1].id)}` : ''} controls autoPlay />}
          { ((shareMode == "single" && activeRecords[0]?.id == undefined) || (shareMode == "side-by-side" && activeRecords.length < 2)) &&
            <span className="txt-small">
              <p>Please select {(shareMode == "side-by-side" && activeRecords[0]?.id == undefined) ? "two videos" : "a video"} from the left column to continue.</p>
            </span>
          }
          {((shareMode == "single" && activeRecords[0].id !== undefined) || (shareMode == "side-by-side" && activeRecords.length == 2)) &&
            <span className="txt-small">
            <p>Clicking &quot;share&quot; will create a public link to {shareMode == "single" ? "this video" : "these videos"}. You can find or delete a link at any time in account settings.</p>
            <p>{requestFeedback ? "People who visit the link will be able to rate your video answer and provide feedback (click Preview to see what they'll see). If you wish to disable this feature, toggle the \"request feedback\" button above." : "People who visit the link will not be able to provide feedback on your video answer. If you wish to enable this feature, toggle the \"request feedback\" button above."}</p>
          </span>
          }
          <Button disabled={shareMode == "single" ? activeRecords[0].id == undefined : activeRecords.length < 2} sx={{ width: "calc(50% - 8px)", mt: 1 }} variant="outlined" onClick={() => setShowPreview(true)}>Preview</Button>
          <Button disabled={shareMode == "single" ? activeRecords[0].id == undefined : activeRecords.length < 2} sx={{ width: "calc(50% - 8px)", mt: 1, ml: 2 }} variant="contained" onClick={createLink}>Share</Button>
        </section>
        <Dialog open={showPreview}>
          <div className="preview-pane">
            <div className="close-icon" onClick={() => setShowPreview(false)}>
              <Image src={close} width={18} height={18} alt="close" />
            </div>
            <div><h1 className="mt-0">Share Link Preview</h1></div>
            <div>Link preview goes here.</div>
          </div>
        </Dialog>
        <Dialog open={showConfirmation}>
          <div className="confirmation-pane">
            <div className="close-icon" onClick={() => { setShowConfirmation(false); setActiveRecords([{} as GraphQLQueryResponseData]); }}><Image src={close} width={18} height={18} alt="close" /></div>
            <div><h1 className="mt-0"></h1></div>
            <div className="p-div">Your share link has been created!</div>
            <div className="p-div">
              <a style={{ color: theme.palette.primary.main }} href={`/social/${lastLink}`} target="_blank" rel="noreferrer">{typeof window  !== 'undefined' ? window.location.hostname : ""}{typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : ""}/social/{lastLink}</a>
            </div>
            <div className="p-div">
              <Button variant="contained" sx={{ width: "100%"  }} onClick={() => {
                if (typeof window !== 'undefined') {
                  const text = `${window ? window.location.hostname : ""}${window && window.location.port ? `:${window.location.port}` : ""}/social/${lastLink}`
                  navigator.clipboard.writeText(text).then(() => {
                    setConfirmCopy(true)
                  })
                }
              }}>Copy</Button>
            </div>
          </div>
        </Dialog>
        <Snackbar
          open={confirmCopy}
          autoHideDuration={5000}
          onClose={() => { setConfirmCopy(false) }}
          message="Link copied to clipboard"
        />
      </main>
      <style jsx>{`
        main {
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          align-items: flex-start;
        }
        .preview-pane {
          position: relative;
          width: 69vw;
          height: 90vh;
          padding: 10px;
        }
        .confirmation-pane {
          position: relative; 
          padding: 16px;
        }
        .txt-small {
          font-size: 0.85rem;
        }
        .mt-0 {
          margin-top: 0;
        }
        .p-div {
          margin-top: 16px; 
          text-align: center;
        }
        .videos {
          width: calc(40vw - 4rem - 16px);
          margin-right: 2rem;
          max-height: calc(100vh - 67px);
          overflow-y: scroll;
        }
        .viewer,
        .viewer-double {
          width: calc(60vw - 2rem - 16px);
        }
        .viewer video {
          height: calc(0.75 * (60vw - 2rem - 16px));
          width: 100%;
          max-width: 100%;
          border-radius: 6px;
        }
        .viewer-double video {
          width: calc(((60vw - 2rem - 16px) / 2) - 8px);
          height: calc(0.75 * (((60vw - 2rem - 16px) / 2) - 8px));
          border-radius: 6px;
        }
        .toggle-buttons {
          display: flex;
          align-items: center; 
          justify-content: space-between; 
          padding-bottom: 16px;
        }
        .ml-2 {
          margin-left: 16px;
        }
        .close-icon {
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 10px;
        }
        @media only screen and (max-width: 700px) {
          main {
            flex-wrap: wrap-reverse;
            flex-direction: row!important;
          }
          .videos {
            width: 100%;
            margin-right: 0;
            max-height: calc(30vh);
          }
          .viewer {
            width: calc(100vw - 2rem);
          }
          .viewer video {
            margin: 0px 10vw;
            max-width: calc(min(80vw - 2rem, 80vh - 2rem));
            height: calc(0.75 * min(80vw - 2rem, 80vh - 2rem));
            border-radius: 6px;
          }
        }
      `}</style>
    </div>
  )
}
