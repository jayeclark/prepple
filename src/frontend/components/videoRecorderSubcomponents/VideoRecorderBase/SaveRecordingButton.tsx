import { Button } from "@mui/material";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { useCallback } from "react";
import { SAVE_VIDEO } from "../../../constants/videoRecorder";

export function SaveRecordingButton({sharedState}: Omit<VideoRecorderComponentProps, "videoObject">) {
  const setShowSaveDialog = sharedState.showSaveDialog.setter;

  const handleSetShowSaveDialog = () => setShowSaveDialog(true);

  return (<Button onClick={handleSetShowSaveDialog}>{SAVE_VIDEO}</Button>);

}