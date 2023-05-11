import { useEffect, useRef, useState } from "react";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { VideoPlayerState } from "../../../constants/app";

export function PreviewStreamScreen({sharedState, videoObject}: VideoRecorderComponentProps) {
  const [loading, setLoading] = useState(true);
  const [srcObject, setSrcObject] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stream = videoObject.previewStream;
  const videoRecorderMode = sharedState.videoRecorderMode.value;

  useEffect(() => {
    console.log("stream active: " + stream?.active);
    console.log("videoref current" + videoRef.current);
    if (stream?.active) {
      setLoading(false);
      setSrcObject(stream);
    }
    else if (videoRecorderMode == VideoPlayerState.INITIALIZED) {
      setLoading(false);
    }
  }, [stream, loading, videoRecorderMode]);

  useEffect(() => {
    if (videoRef.current != null && srcObject != null) {
      videoRef.current.srcObject = srcObject;
    }
  }, [srcObject])

  return (<>
          <div>
      {loading ? "Loading, please wait..." : (<video ref={videoRef} autoPlay><track kind="captions" /></video>)}
          </div>
          <style jsx>{`
            video {
              width: 100%;
              max-width: 100%;
              max-height: 100%;
              position: absolute;
              top: 0; 
              left: 0;
              opacity: ${loading ? 0 : 1}
              transition: opacity 1.5s ease;
            }
          `}</style>
          </>);

}