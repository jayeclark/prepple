import { useCallback, useEffect, useState } from 'react';
import { VideoRecorderComponentProps } from './VideoRecorderBase';
import { MediaState } from '../../../constants/app';
import { Button, useTheme } from '@mui/material';
import { STOP_RECORDING } from '../../../constants/videoRecorder';
import { loadImageCapture, takeScreenshotFromMediaStream } from '../../../scripts/takeScreenshotFromStream';


export default function StopRecordingButton({ sharedState, videoObject }: VideoRecorderComponentProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [imageCaptureClass, setImageCaptureClass] = useState(null);
  const { pauseRecording, previewStream } = videoObject;
  const updateMediaStatus = sharedState.mediaStatus.setter;
  const setPhotoPreviewUrl = sharedState.photoPreviewUrl.setter;

  useEffect(() => {
    async function getImageCapture() {
      const ImageCapture = await loadImageCapture();
      return ImageCapture;
    }
    
    if (typeof window !== undefined) {
      getImageCapture().then((ImageCapture) => setImageCaptureClass(ImageCapture));
    }
  })
    
  const handleStopRecording = useCallback(async () => {
    console.log('stopping recording');
    updateMediaStatus(MediaState.PAUSED);
    setLoading(true);

    const srcPromise = takeScreenshotFromMediaStream(previewStream as MediaStream, imageCaptureClass);
    pauseRecording();

    updateMediaStatus(MediaState.STOPPED);
    const src = await srcPromise.then((res) => { setLoading(false); return res; });
    setPhotoPreviewUrl(src);
    

  }, [previewStream, setPhotoPreviewUrl, pauseRecording, updateMediaStatus, imageCaptureClass ])
  
  return (<>
    <Button onClick={handleStopRecording} aria-label={STOP_RECORDING}>
      <div className="stop-button-outer-container">
        <div className="stop-button-inner-container">
          <div className="stop-button-icon"></div>
        </div>
      </div>
      
    </Button>
    {loading ? (<div style={{color: "#fff"}}>Loading</div>) : null}
    <style jsx>{`
      @keyframes recording-animation {
        0% {
          transform: rotate(0);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes stop-button-animation {
        0% {
          transform: rotate(0);
        }
        50% {
          transform: rotate(-180deg);
        }
        100% {
          transform: rotate(-360deg);
        }
      }
      .stop-button-outer-container {
        width: 24px;
        height: 24px;
        background-color: green;
        background: linear-gradient(.25turn, ${theme.palette.primary.main}, ${theme.palette.secondary.main});
        border-radius: 50%;
        margin: 5px;
        animation: recording-animation 1000ms infinite;
        animation-timing-function: linear;
      }
      .stop-button-inner-container {
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 50%;
        margin: 4px;
        padding: 4px;
      }
      .stop-button-icon {
        width: 8px;
        height: 8px;
        background-color: red;
        animation: stop-button-animation 1000ms infinite;
        animation-timing-function: linear;
      }
    `}</style>
    </>
    )
}