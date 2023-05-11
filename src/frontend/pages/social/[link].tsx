import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import styles from '../../styles/Link.module.css'
import axios from 'axios'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/'
import FeedbackSingle from '../../components/FeedbackSingle'
import FeedbackDouble from '../../components/FeedbackDouble'
import { API_URL } from "../../constants/app";
import { GraphQLQueryResponseData, getLink } from '../../scripts/queries';

export default function Link() {
  const router = useRouter()

  const theme = useTheme()
  const initialVideos: { id: string, s3key: string, title: string }[] = []
  const initialQuestions: GraphQLQueryResponseData[] = []
  const [displayVideos, setDisplayVideos] = useState(initialVideos)
  const [questions, setQuestions] = useState([...initialQuestions])
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [loading, setLoading] = useState(true);

  const getLinkDetails = async () => {
    const videos: {id: string, s3key: string, title: string}[] = []
    const questions: Array<GraphQLQueryResponseData> = []
    const linkSlug: string = router.query.link as string
    const response = await fetch(`${API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getLink,
          variables: {
            slug: linkSlug
          }
        })
    })
    const parsedResponse = await response.json();
    const data = await parsedResponse.data.links.data[0];
    const feedback = await data.attributes.feedback;
    setShowFeedback(feedback);
    const vids = await data.attributes.videos.data;
    vids.forEach((v: GraphQLQueryResponseData) => {
      const temp = {
        id: v.id || "",
        s3key: v.attributes.s3key || "",
        title: (v.attributes.answer?.data as GraphQLQueryResponseData).attributes.title || "",
      }
      videos.push(temp)
      const plan: GraphQLQueryResponseData = v.attributes.answer?.data as GraphQLQueryResponseData;
      const question: GraphQLQueryResponseData = plan?.attributes?.question?.data as GraphQLQueryResponseData;
      questions.push(question);
    })
    return { videos, questions };
  }

  useEffect(() => {
    if (displayVideos.length === 0) {
      getLinkDetails().then(res => {
        setDisplayVideos([...res.videos]);
        setQuestions([...res.questions]);
        setLoading(false);
      })
    }
  })

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData: HTMLFormElement = e.target as HTMLFormElement
    const data = {
      link: router.query.link as string,
      video: displayVideos[0].id,
      date_rated: Date.now(),
      confident: formData.confident.value,
      articulate: formData.articulate.value,
      positive: formData.positive.value,
      relatable: formData.relatable.value,
      focused: formData.focused.value,
      capable: formData.capable.value,
      experienced: formData.experienced.value,
      insightful: formData.insightful.value,
    }
    let error = false
    await axios.post(`${API_URL}/api/ratings`, { data }).then(res => {
      if (res.status === 200) {
        setShowSuccessSnackbar(true);
      } else {
        setShowErrorSnackbar(true);
        error = true;
      }
    })
    if (!error) {
      setShowFeedback(false);
      setFeedbackSent(true);
    }
  }
  
  const handleDualSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData: HTMLFormElement = e.target as HTMLFormElement
    const data1 = {
      link: router.query.link as string,
      video: displayVideos[0].id,
      date_rated: Date.now(),
      confident: formData["confident-1"].value,
      articulate: formData["articulate-1"].value,
      positive: formData["positive-1"].value,
      relatable: formData["relatable-1"].value,
      focused: formData["focused-1"].value,
      capable: formData["capable-1"].value,
      experienced: formData["experienced-1"].value,
      insightful: formData["insightful-1"].value,
    }
    const data2 = {
      link: router.query.link as string,
      video: displayVideos[1].id,
      date_rated: Date.now(),
      confident: formData["confident-2"].value,
      articulate: formData["articulate-2"].value,
      positive: formData["positive-2"].value,
      relatable: formData["relatable-2"].value,
      focused: formData["focused-2"].value,
      capable: formData["capable-2"].value,
      experienced: formData["experienced-2"].value,
      insightful: formData["insightful-2"].value,
    }
    let error = false
    await axios.post(`${API_URL}/api/ratings`, { data: data1 }).then(res => {
      if (res.status === 200) {
        setShowSuccessSnackbar(true);
      } else {
        setShowErrorSnackbar(true);
        error = true;
      }
    })
    await axios.post(`${API_URL}/api/ratings`, { data: data2 }).then(res => {
      if (res.status === 200) {
        setShowSuccessSnackbar(true);
      } else {
        setShowErrorSnackbar(true);
        error = true
      }
    })
    if (!error) {
      setShowFeedback(false);
      setFeedbackSent(true);
    }
  }
  
  return (
    <div>
      <main className={styles.main}>
        {loading ? <Skeleton variant="text" sx={{ width: "calc(min(72vw, 72vh))", height: "37px", my: 3 }}/> : showFeedback ? (<h1>Rate My Response</h1>) : (<h1>Sample Interview Answer</h1>)}
        {loading === false ? ( 
          <>
        <section title="question" className={displayVideos.length === 2 ? "questions" : "question"}>
          {(displayVideos.length === 1 || (displayVideos.length === 2 && questions[0] === questions[1])) && (
            <Card variant="outlined" sx={{ mb: theme.spacing(2), p: theme.spacing(3), display: 'flex', width: '100%', maxHeight: "100%", height: 'fit-content', minHeight: '55px', alignItems: 'center', justifyContent: 'center' }}>
              <div><b>{questions[0].attributes.question}</b></div>
            </Card>
          )}
          {displayVideos.length === 2 && questions[0] !== questions[1] && (
                <div className={styles.questions}>
              <Card variant="outlined" sx={{ mb: theme.spacing(2), p: theme.spacing(3), display: 'flex', width: 'calc(50% - 8px)', mr: 2, maxHeight: "max-content", height: 'calc(max(fit-content, 100%))', minHeight: '55px', alignItems: 'center', justifyContent: 'center' }}>
                <div><b>{questions[0].attributes.question}</b></div>
              </Card>
              <Card variant="outlined" sx={{ mb: theme.spacing(2), p: theme.spacing(3), display: 'flex', width: 'calc(50% - 8px)', maxHeight: "max-content", height: 'calc(max(fit-content, 100%))', minHeight: '55px', alignItems: 'center', justifyContent: 'center' }}>
                <div><b>{questions[1].attributes.question}</b></div>
              </Card>
            </div>
          )}

        </section>
          {displayVideos.length === 1 && (
            <>
              <section title="video" className="video">
                  <video src={displayVideos[0] ? `https://d1lt2f6ccu4rh4.cloudfront.net/${displayVideos[0].s3key}` : ''} controls ><track kind="captions" /></video>
              </section>
            <section title="feedback" className="feedback">
              {!showFeedback && feedbackSent && (
                <div className={styles.confirmation}>
                  Your feedback on this video has been recorded! 
                </div>
              )}
              {showFeedback && (
                <form onSubmit={(e) => handleSingleSubmit(e)}>
                  <h3 className={styles.txtCtr}>I&apos;d love your feedback! How well do I meet these criteria?</h3>
                  <FeedbackSingle />
                  <Button type="submit" size="large" sx={{minWidth: "50%", margin: "16px 25% 0px 25%"}} variant="contained">Share Feedback</Button>
                </form>
              )}
              </section>
            </>
          )}
          {displayVideos.length > 1 && (
            <>
              <section title="videos" className="videos">
                <div className="video-comp mr-2">
                  <video src={displayVideos[0] ? `https://d1lt2f6ccu4rh4.cloudfront.net/${displayVideos[0].s3key}` : ''} controls ><track kind="captions" /></video>
                </div>
                <div className="video-comp">
                  <video src={displayVideos[1] ? `https://d1lt2f6ccu4rh4.cloudfront.net/${displayVideos[1].s3key}` : ''} controls ><track kind="captions" /></video>
                </div>
              </section>
            <section title="feedback" className="feedback-double">
              {!showFeedback && feedbackSent && (
                <div className={styles.confirmation}>
                  Your feedback on these videos has been recorded! 
                </div>
              )}
              {showFeedback && (
                  <form onSubmit={(e) => handleDualSubmit(e)}>
                    <h3 className={styles.txtCtr}>I&apos;d love feedback on which video is better! How well does each one meet these criteria?</h3>
                    <FeedbackDouble />
                    <Button type="submit" size="large" sx={{minWidth: "50%", margin: "16px 25% 0px 25%"}} variant="contained">Share Feedback</Button>
                  </form>
              )}
              </section>
            </>
        )}</>
        ) : (
          <>
            <Skeleton variant="rectangular" width={"calc(min(72vw, 72vh))"} height={65} sx={{ mb: 2 }}  />
            <Skeleton variant="rectangular" width={"calc(min(72vw, 72vh))"} height={"calc(min(54vw, 54vh))"} sx={{ mb: 2 }}  />
          </>
        )}
      </main>
      <Snackbar
          open={showSuccessSnackbar}
          autoHideDuration={5000}
          onClose={() => { setShowSuccessSnackbar(false) }}
          message="Feedback submitted!"
      />
      <Snackbar
          open={showErrorSnackbar}
          autoHideDuration={5000}
          onClose={() => { setShowErrorSnackbar(false) }}
          message="Problem submitting feedback, please try again."
        />
      <style jsx>{`
        .question,
        .video,
        .feedback {
          width: calc(min(72vh, 72vw));
          min-width: calc(min(72vh, 72vw));
          max-width: 1600px;
        }
        .videos,
        .questions,
        .feedback-double {
          width: calc(min(88vh, 88vw));
          min-width: calc(min(88vh, 88vw));
          max-width: 1600px;
        }
        .question,
        .questions {
          min-height: 85px;
          height: max-content;
          margin-bottom; 16px;
        }
        .video {
          height: calc(min(54vh, 54vw));
          min-height: calc(min(54vh, 54vw));
          max-height: 1200px;
        }
        .video video {
          width: calc(min(72vh, 72vw));
          min-width: calc(min(72vh, 72vw));
          max-width: 1600px;
          height: calc(min(54vh, 54vw));
          min-height: calc(min(54vh, 54vw));
          max-height: 1200px;  
          border-radius: 6px;        
        }
        .videos {
          display: flex;
          flex-wrap: nowrap;
          height: calc(min((33vh - 6px), (33vw - 6px)));
          min-height: calc(min((33vh - 6px), (33vw - 6px)));
          max-height: 600px;
        }

        .videos video {
          width: calc(min((44vh - 8px), (44vw - 8px)));
          min-width: calc(min((44vh - 8px), (44vw - 8px)));
          max-width: 800px;
          height: calc(min((33vh - 6px), (33vw - 6px)));
          min-height: calc(min((33vh - 6px), (33vw - 6px)));
          max-height: 600px;
        }

        .video-comp {
          width: calc(min((44vh - 8px), (44vw - 8px)));
          min-width: calc(min((44vh - 8px), (44vw - 8px)));
          max-width: 800px;
          height: calc(min((33vh - 6px), (33vw - 6px)));
          min-height: calc(min((33vh - 6px), (33vw - 6px)));
          max-height: 600px;
        }
        .video-comp video {
          border-radius: 6px;
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
        .mr-2 {
          margin-right: 16px;
        }
        .feedback-btn {
          min-width: 50%;
          margin: 16px 25% 0px 25%;
        }
      `}</style>
    </div>
  )
}