import { SharedState, VideoObject, VideoRecorderComponentProps } from "../VideoRecorderBase/VideoRecorderBase";
import { PreviewStaticPhotoScreen } from "../VideoRecorderBase/PreviewStaticPhotoScreen";
import { PreviewStreamScreen } from "../VideoRecorderBase/PreviewStreamScreen";
import { RecordInScreenControls } from "./RecordInScreenControls";
import { RecordBelowScreenControls } from "./RecordBelowScreenControls";
import { MediaState } from "../../../constants/app";
import { useEffect } from "react";

interface RecordInterfaceProps {
  sharedState: SharedState;
  videoObject: VideoObject;
}

export default function RecordInterface({ sharedState, videoObject }: RecordInterfaceProps) {
  useEffect(() => {
    videoObject.startRecording();
    videoObject.pauseRecording();
  })
  return <>
    <div>
      <div id="video-container" className="video-container">
        <RecordScreen videoObject={videoObject} sharedState={sharedState} />
        <RecordInScreenControls videoObject={videoObject} sharedState={sharedState} />
      </div>
      <RecordBelowScreenControls videoObject={videoObject} sharedState={sharedState}/>
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

function RecordScreen({ videoObject, sharedState }: VideoRecorderComponentProps) {
  const showPreviewStreamWhenInitializedOrActive = sharedState.showPreview.value && sharedState.mediaStatus.value !== MediaState.STOPPED;
  const showPreviewStreamWhenStopped = (sharedState.photoPreviewUrl.value == null || sharedState.photoPreviewUrl.value == "") && sharedState.mediaStatus.value === MediaState.STOPPED;
  return (showPreviewStreamWhenInitializedOrActive || showPreviewStreamWhenStopped) ? <PreviewStreamScreen sharedState={sharedState} videoObject={videoObject}/> : <PreviewStaticPhotoScreen sharedState={sharedState}/>
}