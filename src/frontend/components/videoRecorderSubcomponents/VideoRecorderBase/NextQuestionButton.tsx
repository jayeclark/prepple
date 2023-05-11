import { Button } from "@mui/material";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { buttonStyle } from "../../../constants/inlineStyles";
import { NEXT_QUESTION } from "../../../constants/videoRecorder";

export function NextQuestionButton({sharedState}: Omit<VideoRecorderComponentProps, "videoObject">) {
  const { handleNextQuestion } = sharedState;
  return (
    <Button
      sx={{ ...buttonStyle }}
      size="large"
      variant="contained"
      onClick={handleNextQuestion}
    >
      <b>{NEXT_QUESTION}</b>
    </Button>);
}