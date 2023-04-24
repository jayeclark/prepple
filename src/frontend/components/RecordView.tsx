import { useEffect, useRef, useState, useContext, SyntheticEvent, FormEvent } from "react";
import axios from "axios";
import Image from "next/image";
import { useReactMediaRecorder } from "react-media-recorder";
import { UserContext } from "../scripts/context";
import { FormGroup, FormControlLabel, Switch, useTheme } from "@mui/material";
import { Dialog, Button, Card, CardContent, TextField, Slider } from "@mui/material";
import cloudCheck from "../assets/cloud-check.svg";
import { API_URL } from "../pages";

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && stream.active) {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setLoading(false)
      }
    }
  }, [stream, loading]);

  return (<>
          <div id="video-container" className="video-container">
            Loading, please wait...
            <video ref={videoRef} autoPlay />
          </div>
          <style jsx>{`
            .video-container {
              width: 100%;
              height: calc(min(54vh, 54vw));
              background-color: black!important;
              max-width: 100%;
              max-height: 100%;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            video {
              width: 100%;
              max-width: 100%;
              max-height: 100%;
              position: absolute;
              top: 0; 
              left: 0;
              opacity: ${loading ? 0 : 1}
              transition: opacity 1.5s ease;
            }
            @media only screen and (max-width: 700px) {
              .video-container {
                width: 100%;
                height: calc(min(66vh, 66vw));
                background-color: black!important;
                max-width: 100%;
                max-height: 100%;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          `}</style>
          </>);
};

interface RecordSaveForm extends EventTarget {
  title: HTMLInputElement;
  rating: HTMLInputElement;
}

const RecordView = ({ questionId, handleNextQuestion, title="", answerId="" }: { questionId: string, handleNextQuestion?: (e?: SyntheticEvent) => void, title?: string, answerId?: string }) => {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const [recording, setRecording] = useState(false);
  const [displayRecording, setDisplayRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const { startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });

  const handleSave = async (e: SyntheticEvent) => {
    setSaving(true);
    const mediaBlob: Blob = await fetch(mediaBlobUrl as string).then (res => res.blob());
    const dateStamp: number = new Date(Date.now()).getTime();
    const fileName = user.id + "-" + dateStamp;
    const file = new File([mediaBlob], `${fileName}.mp4`, { type: 'video/mp4' });

    const formData = new FormData();
    formData.append("file", file);

    const s3result: Response = await fetch(`/api/put-s3?id=${user.id}`, {
      method: "POST",
      body: formData
    })
    const bodyText = await s3result.json();

    const answerBody = {
      data: {
          users_permissions_user: user.id,
          user_id: user.id,
          question: questionId,
          title: (e.target as RecordSaveForm).title.value,
      }
    }
    const headers = {
      Authorization: `Bearer ${user.jwt}`
    }
    let id = answerId;
    if (!id) {
      const res = await axios.post(`${API_URL}/api/answers`, answerBody, { headers });
      const data = await res.data
      const answer = await data.answer
      id = await answer.id
    }
    const videoBody = {
      data: {
          s3key: bodyText.filename,
          users_permissions_user: user.id,
          user_id: user.id,
          datetime: new Date(Date.now()).getTime(),
          question: questionId,
          rating: (e.target as RecordSaveForm).rating.value,
          answer: id,        
      }
    }

    axios.post(`${API_URL}/api/videos`, videoBody, { headers }).then(res => {
      setSaving(false);
      setShowSave(false);
      setHasSaved(true);
      setPlaying(false);
    })
  }

  const handleStart = () => {
    setPlaying(false);
    startRecording();
    setRecording(true);
    setTimeout(() => setDisplayRecording(true), 1500);
  }

  const handleWatch = () => {
    setPlaying(true);
    if (activeVideoPlayer.current) {
      const element: HTMLVideoElement = activeVideoPlayer.current
      element.play()
    }
  }

  const handleStop = () => {
    stopRecording();
    setHasRecorded(true);
    setRecording(false);
    setTimeout(() => setDisplayRecording(false), 500);
  }

  const buttonStyle = {
    m: 1, 
    width: 250  
  }

  const cornerStyle = {
    position: 'absolute!important',
    top: '16px',
    right: '16px',
  }

  const cornerStyleLower = {
    position: 'absolute!important',
    top: user.id ? '74.25px' : '16px',
    right: '16px',
  }

  const activeVideoPlayer = useRef(null);

  const handleSwitch = () => {
    setShowPreview(!showPreview);
  }

  const imageStyle = {
    maxWidth: "calc(min(60vh, 60vw))",
    maxHeight: "calc(min(60vh, 60vw))",
    overflow: "hidden"
  }

  const cardStyle = {
    width: 'calc(100% - 32px)',
    padding: 24,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: "6px",
    fontWeight: 500
  }

  return (
    <>
      <section id="record-answer" className="answer-container">
        <div className="video-screen">
          {recording && showPreview && (<VideoPreview stream={previewStream} />)}
          {recording && !showPreview && (<div className="fake-person"><Image layout="responsive" width={400} height={400} style={imageStyle} alt="fake person" src="https://fakeface.rest/face/view?minimum_age=24&maximum_age=50" /></div>)}
          {!recording && (<video ref={activeVideoPlayer} src={mediaBlobUrl || ''} controls autoPlay={playing ? true : false} />)}
          <div className={!playing && !recording ? "overlay" : "overlay-hidden"} >
          { !recording && (
            <>
            {hasRecorded && hasSaved && (<>
                  <Card variant="outlined" style={cardStyle}>
                    <Image width={20} height={20} src={cloudCheck} alt="checkmark" style={{ transform: 'translateY(3px)'}} />&nbsp;&nbsp;Your video has been saved!
                  </Card><div className="flex-line-break"></div>
                  {handleNextQuestion && (
                    <Button sx={{...buttonStyle}} size="large" variant="contained" onClick={handleNextQuestion}><b>Next Question</b></Button>
                  )}
                  <div className="flex-line-break"></div>
                </>)}
            {hasRecorded && !hasSaved && (
              <>
                <Button sx={{...buttonStyle}} size="large" variant="contained" onClick={handleWatch}><b>Watch your answer</b></Button>
                <div className="flex-line-break"></div>
              </>
            )}
            {hasRecorded && (
              <>
                <Button sx={{...buttonStyle, opacity: 0.85, background: "#fff"}} size="large" variant="outlined" onClick={handleStart}><b>Try Again</b></Button>
              </>
            )}
            {!hasRecorded && (<Button sx={{...buttonStyle}} size="large" variant="contained" onClick={handleStart}><b>Record an answer</b></Button>)}
            </>
            
          )}
          </div>
          {recording && displayRecording && (
            <>
              <div className={showPreview ? "stop-button" : "stop-button-no-preview"} >
                <Button size="large" variant="contained" color="error" onClick={handleStop}><b>Stop Recording</b></Button>
              </div>
              {displayRecording && <div className={showPreview ? "recording-indicator" : "recording-indicator-no-preview"}></div>}
            </>
          )}
          {(!hasRecorded || recording) && (
            <FormGroup>
              <FormControlLabel control={<Switch checked={showPreview} onChange={handleSwitch} />} label="Enable Video Preview" />
            </FormGroup>
          )}
          {playing && (
            <Button sx={{...buttonStyle, ...cornerStyleLower, opacity: 0.85, background: "#fff" }} size="large" variant="outlined" onClick={handleStart}><b>Try Again</b></Button>
          )}
          {playing && user.email && (
            <Button sx={{...buttonStyle, ...cornerStyle }} size="large" variant="contained" onClick={() => setShowSave(true)}><b>Save Answer</b></Button>
          )}
        </div>
        <Dialog open={showSave}>
            <Card>
              <CardContent>
                <h1>Save This Recording</h1>
                <span className="txt-small">
                  Save this recording to review in the future, or include in a video resume.
                </span>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(e) }}>
                {!title && (
                    <TextField 
                      id="title" 
                      name="title"
                      label="(Optional) Add a brief descriptive title"
                      sx={{ width: "100%", mt: 4, mb: 2 }}
                    />
                  )}
                  <label htmlFor="rating">Rate your performance (0 - 5 stars)</label>
                  <Slider 
                    min={0}
                    max={10}
                    name="rating"
                    defaultValue={6}
                    step={1}
                    valueLabelDisplay="off"
                    sx={{ mb: 6 }}
                    marks={[
                      { value: 0, label: "0" },
                      { value: 1, label: "" },
                      { value: 2, label: "1" },
                      { value: 3, label: "" },
                      { value: 4, label: "2" },
                      { value: 5, label: "" },
                      { value: 6, label: "3" },
                      { value: 7, label: "" },
                      { value: 8, label: "4" },
                      { value: 9, label: "" },
                      { value: 10, label: "5" }
                    ]}
                  />
                   <div className="txt-right">
                    <Button style={{ marginLeft: 'auto' }}  onClick={() => setShowSave(false)} disabled={saving}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={saving}>{saving ? "Saving - Please Wait" : "Save Answer"}</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
        </Dialog>

      </section>
      <style jsx>{`
        h1 {
          margin-bottom: 4px;
          margin-top: 0px;
        }
        .answer-container {
          position: relative;
        }
        .fake-person {
          background-color: #000; 
          height: calc(min(54vh, 54vw)); 
          width: calc(min(54vh, 54vw));
          max-width: calc(min(54vh, 54vw));
          overflow: hidden; 
          margin: 0px auto;
        }
        .flex-line-break {
          width: 100%;
        }
        .video-screen {
          width: calc(min(72vh, 72vw));
          height: calc(min(54vh, 54vw));
          min-width: calc(min(72vh, 72vw));
          min-height: calc(min(54vh, 54vw));
          max-width: 1600px;
          max-height: 1200px;
          position: relative;
        }

        video {
          width: calc(min(72vh, 72vw));
          height: calc(min(54vh, 54vw));
          min-width: calc(min(72vh, 72vw));
          min-height: calc(min(54vh, 54vw));
          border-radius: 6px;
        }
        
        .overlay,
        .overlay-hidden {
           opacity: 0.95;
           background-color: transparent;
           width: 100%;
           height: 100%;
           position: absolute;
           top: 0px;
           left: 0px;
           z-index: 999;
           display: flex;
           flex-wrap: wrap;
           justify-content: center;
           align-content: center;
        }
        .overlay {
          visibility: visible;
          backdropFilter: blur(20px);
        }
        .overlay-hidden {
          visibility: hidden;
        }
        .record-button-watching {
          position: absolute!important;
          top: 16px;
          right: 16px;
        }
        .txt-right {
          text-align: right;
        }
        .txt-small {
          font-size: 0.85rem;
        }
        .stop-button {
          position: absolute!important;
          top: 16px;
          right: 16px;
        }

        .stop-button-no-preview {
          position: absolute!important;
          top: 16px;
          right: calc(16px + min(10vh, 10vw));
        }

        .recording-indicator {
          position: absolute!important;
          top: 24px;
          left: 24px;
          border-radius: 12px;
          height: 12px;
          width: 12px;
          outline: 2px solid white;
          outline-offset: 2px;
          background-color: red;
        }

        .recording-indicator-no-preview {
          position: absolute!important;
          top: 24px;
          left: calc(24px + min(10vh, 10vw));
          border-radius: 12px;
          height: 12px;
          width: 12px;
          outline: 2px solid white;
          outline-offset: 2px;
          background-color: red;
        }

        .recording-indicator::after,
        .recording-indicator-no-preview::after {
          content: "Recording";
          color: white;
          font-weight: 600;
          margin-left: 24px;
          font-size: 0.8em;
          line-height: 14px;
          position: absolute;
        }
        @media only screen and (max-width: 700px) {

          .video-screen {
            width: calc(min(88vh, 88vw));
            height: calc(min(66vh, 66vw));
            min-width: calc(min(88vh, 88vw));
            min-height: calc(min(66vh, 66vw));
            max-width: 1600px;
            max-height: 1200px;
            position: relative;
          }

          video {
            width: calc(min(88vh, 88vw));
            height: calc(min(66vh, 66vw));
            min-width: calc(min(88vh, 88vw));
            min-height: calc(min(66vh, 66vw));
            border-radius: 6px;
          }
          
        }
      `}</style>
    </>
  );
};

export default RecordView;