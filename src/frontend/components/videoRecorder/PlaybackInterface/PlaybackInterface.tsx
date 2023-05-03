import { VideoRecorderComponentProps } from '../VideoRecorderBase/VideoRecorderBase';
import { PlaybackBelowScreenControls } from "./PlaybackBelowScreenControls";
import { SaveVideoDialog } from "./PlaybackSaveVideoDialog";

export default function PlaybackInterface({ videoObject, sharedState}: VideoRecorderComponentProps) {

  return (<>
    <VideoPlayerScreen videoObject={videoObject} sharedState={sharedState} />
    <SaveVideoDialog videoObject={videoObject} sharedState={sharedState} />
  </>
  )
}

function VideoPlayerScreen({ videoObject, sharedState }: VideoRecorderComponentProps) {
  return (
    <div>
      <div className="video-screen">
        <video src={videoObject.mediaBlobUrl || ''} controls autoPlay><track kind="captions" /></video>
      </div>
    <PlaybackBelowScreenControls videoObject={videoObject} sharedState={sharedState} />
    </div>
  )
}