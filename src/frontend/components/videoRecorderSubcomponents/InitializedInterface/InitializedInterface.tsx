import { useCallback, useEffect } from "react";
import { VideoRecorderComponentProps } from '../VideoRecorderBase/VideoRecorderBase';
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { InitializedInScreenControls } from "./InitializedInScreenControls";
import InitialVideoRecordingScreen from "./InitialVideoRecordingScreen";
import { RecordBelowScreenControls } from "../RecordInterface/RecordBelowScreenControls";

export default function InitializedInterface({ sharedState, videoObject }: VideoRecorderComponentProps) {

  console.log("showing initialized interface...");
  useEffect(() => {
    videoObject.startRecording();
    videoObject.pauseRecording();
  })

  return <><div>
    <div id="video-container" className="video-container">
      <InitialVideoRecordingScreen videoObject={videoObject} sharedState={sharedState} />
      <InitializedInScreenControls videoObject={videoObject} sharedState={sharedState} />
    </div>
    <RecordBelowScreenControls videoObject={videoObject} sharedState={sharedState}/>
  </div>
    <style jsx>{`
    .video-container {
      height: calc(min(42vh, 42vw));
      width: calc(min(56vh, 56vw));
      padding-left: calc(50% - min(28vh, 28vw));
      background-color: black!important;
      max-width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
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
    </>

}