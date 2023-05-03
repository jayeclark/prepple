import { Button } from "@mui/material";
import { MediaState, VideoPlayerState } from "../../../constants/app";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { useCallback } from "react";
import { START_RECORDING } from "../../../constants/videoRecorder";

export default function StartRecordingButton(props: VideoRecorderComponentProps) {
  const { sharedState, videoObject } = props;
  const { startRecording, resumeRecording } = videoObject;
  const { value: videoRecorderMode, setter: setVideoRecorderMode } = sharedState.videoRecorderMode;
  const updateMediaStatus = sharedState.mediaStatus.setter;
  const setRecordingStartTime = sharedState.recordingStartTimestamp.setter;
  const setPhotoPreviewUrl = sharedState.photoPreviewUrl.setter;

  const handleStartRecording = useCallback(() => {
      if (videoRecorderMode === VideoPlayerState.INITIALIZED) {
        console.log("setting mode to recording");
          setVideoRecorderMode(VideoPlayerState.RECORDING);
      }
      setPhotoPreviewUrl("");
      //startRecording();
      resumeRecording();
      setRecordingStartTime(Date.now());
      updateMediaStatus(MediaState.STREAMING);
    },
    [videoRecorderMode,
      setVideoRecorderMode,
      resumeRecording,
      updateMediaStatus,
      setRecordingStartTime,
      setPhotoPreviewUrl])
    
  return <>
    <Button onClick={handleStartRecording} aria-label={START_RECORDING}><div className="record-button"></div></Button>
    <style jsx>{`
      .record-button {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: red;
        outline: 4px solid white;
        margin: 5px;
      }
    `}</style>
    </>
}