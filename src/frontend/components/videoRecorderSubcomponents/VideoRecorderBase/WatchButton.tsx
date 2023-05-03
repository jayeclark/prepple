import { Button, useTheme } from "@mui/material";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { MediaState, VideoPlayerState } from "../../../constants/app";
import { useCallback } from "react";
import { WATCH_VIDEO } from "../../../constants/videoRecorder";

export function WatchButton({sharedState, videoObject}: VideoRecorderComponentProps) {

  const theme = useTheme();
  const { stopRecording } = videoObject;

  const setVideoRecorderState = sharedState.videoRecorderMode.setter;
  const setMediaState = sharedState.mediaStatus.setter;
  const setRecordingStartTimestamp = sharedState.recordingStartTimestamp.setter;
  
  const handleChangeVideoPlayerState = useCallback(() => {
    stopRecording();
    setRecordingStartTimestamp(null);
    setVideoRecorderState(VideoPlayerState.PLAYING);
    setMediaState(MediaState.INITIALIZED);
  }, [setVideoRecorderState, setMediaState, stopRecording, setRecordingStartTimestamp]);

  return (<Button sx={{ margin: theme.spacing(1) }} color="secondary" variant="contained" onClick={handleChangeVideoPlayerState}>{WATCH_VIDEO}</Button>)
  
}