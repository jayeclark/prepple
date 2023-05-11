import { useState, useContext, SyntheticEvent } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { UserContext } from "../scripts/context";

import { MediaState, VideoPlayerState } from "../constants/app";
import RecordInterface from "./videoRecorderSubcomponents/RecordInterface/RecordInterface";
import PlaybackInterface from "./videoRecorderSubcomponents/PlaybackInterface/PlaybackInterface";
import { SharedState, VideoObject } from "./videoRecorderSubcomponents/VideoRecorderBase/VideoRecorderBase";
import InitializedInterface from "./videoRecorderSubcomponents/InitializedInterface/InitializedInterface";


const VideoRecorder = ({ questionId, handleNextQuestion, title="", answerId="" }: { questionId: string, handleNextQuestion?: (e?: SyntheticEvent) => void, title?: string, answerId?: string }) => {
  const { user } = useContext(UserContext);
  const [showPreview, setShowPreview] = useState(true);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [videoRecorderMode, setVideoRecorderMode] = useState(VideoPlayerState.INITIALIZED);
  const [mediaStatus, setMediaStatus] = useState(MediaState.STOPPED);
  const [recordingStartTimestamp, setRecordingStartTimestamp] = useState<null | number>(null);
  
  const { startRecording, pauseRecording, resumeRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl } =
    useReactMediaRecorder({ video: true });

  const videoObject: VideoObject = { startRecording, pauseRecording, resumeRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl };
  const sharedState: SharedState = {
    showPreview: { value: showPreview, setter: setShowPreview },
    photoPreviewUrl: {value: photoPreviewUrl, setter: setPhotoPreviewUrl},
    showSaveDialog: { value: showSaveDialog, setter: setShowSaveDialog },
    videoRecorderMode: { value: videoRecorderMode, setter: setVideoRecorderMode},
    mediaStatus: { value: mediaStatus, setter: setMediaStatus },
    recordingStartTimestamp: { value: recordingStartTimestamp, setter: setRecordingStartTimestamp },
    user: { value: user },
    questionId: { value: questionId },
    answerId: { value: answerId },
    handleNextQuestion: handleNextQuestion as ((e: SyntheticEvent) => void)
  }
  
  return (
    <>
      <section id="record-answer" className="answer-container">
        {videoRecorderMode === VideoPlayerState.INITIALIZED ? <InitializedInterface sharedState={sharedState} videoObject={videoObject} /> : null}
        {videoRecorderMode === VideoPlayerState.RECORDING ? <RecordInterface sharedState={sharedState} videoObject={videoObject} /> : null}
        {videoRecorderMode === VideoPlayerState.PLAYING ? <PlaybackInterface videoObject={videoObject} sharedState={sharedState}/> : null}
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
          width: calc(min(36vh, 36vw));
          height: calc(min(27vh, 27vw));
          max-width: 1600px;
          max-height: 1200px;
          position: relative;
        }

        video {
          width: calc(min(36vh, 36vw));
          height: calc(min(27vh, 27vw));
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

export default VideoRecorder;