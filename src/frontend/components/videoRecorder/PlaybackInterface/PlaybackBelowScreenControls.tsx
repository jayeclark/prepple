import { BelowScreenControls } from "../VideoRecorderBase/BelowScreenControls";
import { RecordAgainButton } from "../VideoRecorderBase/RecordAgainButton";
import { SaveRecordingButton } from "../VideoRecorderBase/SaveRecordingButton";
import { VideoRecorderComponentProps } from "../VideoRecorderBase/VideoRecorderBase";

export function PlaybackBelowScreenControls({sharedState, videoObject}: VideoRecorderComponentProps) {
  
  const leftJustifiedButtons = [RecordAgainButton, SaveRecordingButton];

  return <BelowScreenControls sharedState={sharedState} videoObject={videoObject} leftButtons={leftJustifiedButtons}/>
}