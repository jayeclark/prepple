import { JSXElementConstructor } from "react";
import { InScreenControls } from "../VideoRecorderBase/InScreenControls";
import { VideoRecorderComponentProps } from "../VideoRecorderBase/VideoRecorderBase";
import { MediaState } from "../../../constants/app";
import { RecordingIndicator } from "../VideoRecorderBase/RecordingIndicator";
import StartRecordingButton from "../VideoRecorderBase/StartRecordingButton";
import StopRecordingButton from "../VideoRecorderBase/StopRecordingButton";
import { RecordingCounter } from "../VideoRecorderBase/RecordingCounter";
import { WatchButton } from "../VideoRecorderBase/WatchButton";
import { RecordAgainButton } from "../VideoRecorderBase/RecordAgainButton";

export function RecordInScreenControls({sharedState, videoObject}: VideoRecorderComponentProps) {

  const shouldShowRecordingIndicator = sharedState.mediaStatus.value == MediaState.STREAMING;
  const shouldShowWatchAndRecordAgainButtons = sharedState.mediaStatus.value == MediaState.STOPPED;
  const shouldShowRecordButton = sharedState.mediaStatus.value == MediaState.INITIALIZED;
  const shouldShowStopButton = sharedState.mediaStatus.value == MediaState.STREAMING;

  const textButtons: (JSXElementConstructor<VideoRecorderComponentProps> | JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>)[] = [];
  if (shouldShowRecordingIndicator) { textButtons.push(RecordingIndicator); }
  if (shouldShowWatchAndRecordAgainButtons) {
    textButtons.push(WatchButton);
    textButtons.push(RecordAgainButton);
  }
  
  const iconButtons: (JSXElementConstructor<VideoRecorderComponentProps> | JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>)[] = [];
  if (shouldShowRecordButton) { iconButtons.push(StartRecordingButton); }
  if (shouldShowStopButton) {
    iconButtons.push(StopRecordingButton);
    iconButtons.push(RecordingCounter);
  }

  return <InScreenControls sharedState={sharedState} videoObject={videoObject} textButtons={textButtons} iconButtons={iconButtons}/>;
}