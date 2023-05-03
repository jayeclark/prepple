import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { useCallback } from "react";

export function PreviewToggler({sharedState}: VideoRecorderComponentProps) {
  
  const { value: showPreview, setter: setShowPreview } = sharedState.showPreview;
  const handleHidePreviewStream = useCallback(() => {
    if (setShowPreview) {
      setShowPreview(false);
    }
  }, [setShowPreview]);

  const handleShowPreviewStream = useCallback(() => {
    if (setShowPreview) {
      setShowPreview(true);
    }
  }, [setShowPreview]);

  const showVideoPreviewLabel = (<span style={{fontSize: "12px"}}>Show Video Preview</span>)

  return (
    <>
      <FormGroup>
        <FormControlLabel control={<Switch checked={showPreview as boolean} onChange={showPreview ? handleHidePreviewStream : handleShowPreviewStream} />} label={showVideoPreviewLabel} />
      </FormGroup>
      <style jsx>{`
        label > span > span {
          font-size: 12px;
        }
      `}</style>
    </>)
    ;
}