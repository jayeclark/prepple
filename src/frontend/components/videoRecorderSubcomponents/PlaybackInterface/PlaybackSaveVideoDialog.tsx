import { SyntheticEvent, useState } from "react";
import { VideoRecorderComponentProps } from "../VideoRecorderBase/VideoRecorderBase";
import { saveS3KeyToPostgres, saveVideoToS3 } from "../../../scripts/saveVideo";
import { VideoPlayerState } from "../../../constants/app";
import { Button, Card, CardContent, Dialog, Slider, TextField } from "@mui/material";

export function SaveVideoDialog(props: VideoRecorderComponentProps) {
  const { mediaBlobUrl } = props.videoObject;
  const { value: showSaveDialog, setter: setShowSaveDialog } = props.sharedState.showSaveDialog;
  const setVideoRecorderMode = props.sharedState.videoRecorderMode.setter;
  const user = props.sharedState.user.value;
  const questionId = props.sharedState.questionId.value;
  const answerId = props.sharedState.answerId?.value;
  const [saving, setSaving] = useState(false);

  const handleHideSaveDialog = () => setShowSaveDialog(false);

  const handleSave = async (e: SyntheticEvent) => {
    setSaving(true);
    const bodyText = await saveVideoToS3(mediaBlobUrl as string, user);
    const result = await saveS3KeyToPostgres({
      event: e,
      user, 
      questionId,
      answerId: answerId || "",
      s3UploadResult: bodyText
    })
    if (result.status != 200) {
      throw new Error("Error saving video data to database")
    } else {
      setSaving(false);
      setShowSaveDialog(false);
      setVideoRecorderMode(VideoPlayerState.RECORDING);
    }
  }

  const marks = [];
  let i = 0;
  while (i <= 10) {
    const entry = { value: i, label: i % 2 == 0 ? (i / 2).toString() : "" }
    marks.push(entry);
    i++;
  }

  return  (<Dialog open={showSaveDialog}>
            <Card>
              <CardContent>
                <h1>Save This Recording</h1>
                <span className="txt-small">
                  Save this recording to review in the future, or include in a video resume.
                </span>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(e) }}>
                    <TextField 
                      id="title" 
                      name="title"
                      label="(Optional) Add a brief descriptive title"
                      sx={{ width: "100%", mt: 4, mb: 2 }}
                    />
                  <label htmlFor="rating">Rate your performance (0 - 5 stars)</label>
                  <Slider
                    min={0}
                    max={10}
                    name="rating"
                    defaultValue={6}
                    step={1}
                    valueLabelDisplay="off"
                    sx={{ mb: 6 }}
                    marks={marks}
                  />
                   <div className="txt-right">
                    <Button sx={{ marginLeft: 'auto' }} onClick={handleHideSaveDialog} disabled={saving}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={saving}>{saving ? "Saving - Please Wait" : "Save Answer"}</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
        </Dialog>)
}