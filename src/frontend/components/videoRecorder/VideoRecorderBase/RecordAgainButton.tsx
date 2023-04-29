import { Button, useTheme } from "@mui/material";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { MediaState, VideoPlayerState } from "../../../constants/app";
import { useCallback } from "react";
import { RECORD_AGAIN } from "../../../constants/videoRecorder";

export function RecordAgainButton({sharedState, videoObject}: VideoRecorderComponentProps) {

  const theme = useTheme();
  const { stopRecording } = videoObject;
  
  const setVideoRecorderState = sharedState.videoRecorderMode.setter;
  const setMediaStatus = sharedState.mediaStatus.setter;
  const setRecordingStartTimestamp = sharedState.recordingStartTimestamp.setter;
  
  const changeVideoPlayerState = useCallback(() => {
    setVideoRecorderState(VideoPlayerState.INITIALIZED);
    setMediaStatus(MediaState.INITIALIZED);
    setRecordingStartTimestamp(null);
    stopRecording();
  
  }, [setVideoRecorderState, setMediaStatus, stopRecording, setRecordingStartTimestamp]);

  return (<Button sx={{ margin: theme.spacing(1) }} color="secondary" variant="outlined" onClick={changeVideoPlayerState}>{RECORD_AGAIN}</Button>)
  
}