import { JSXElementConstructor } from "react";
import { InScreenControls } from "../VideoRecorderBase/InScreenControls";
import { VideoRecorderComponentProps } from "../VideoRecorderBase/VideoRecorderBase";
import { MediaState } from "../../../constants/app";
import StartRecordingButton from "../VideoRecorderBase/StartRecordingButton";

export function InitializedInScreenControls({sharedState, videoObject}: VideoRecorderComponentProps) {

  const shouldShowRecordButton = sharedState.mediaStatus.value == MediaState.INITIALIZED || sharedState.mediaStatus.value == MediaState.STOPPED;
  console.log(" should show record button = " + shouldShowRecordButton);
  console.log(sharedState.mediaStatus.value);

  const iconButtons: (JSXElementConstructor<VideoRecorderComponentProps> | JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>)[] = [];
  if (shouldShowRecordButton) { iconButtons.push(StartRecordingButton); }

  return <InScreenControls sharedState={sharedState} videoObject={videoObject} iconButtons={iconButtons}/>;
}