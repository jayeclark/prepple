import { useCallback, useEffect, useState } from "react";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { useTheme } from "@mui/material";
import { MediaState } from "../../../constants/app";

export function RecordingCounter(props: VideoRecorderComponentProps) {
  const theme = useTheme();

  const [currentTime, setCurrentTime] = useState(Date.now());
  const { value: recordingStartTimestamp } = props.sharedState.recordingStartTimestamp;

  const getCurrentTime = () => Date.now();
  const counterCallback = useCallback(() => {
    if (props.sharedState.mediaStatus.value !== MediaState.STOPPED && props.sharedState.mediaStatus.value !== MediaState.PAUSED) {
      setCurrentTime(getCurrentTime());
    }
  }, [props.sharedState.mediaStatus.value])

  useEffect(() => {
    console.log("setting timeout");
    console.log(getCurrentTime() - recordingStartTimestamp!);
    const timer = setInterval(counterCallback, 20);
    return () => clearInterval(timer);
  }, [recordingStartTimestamp, counterCallback])

  return <>
    <div className="counter">
      <div className="progress-bar"></div>
      <div className="seconds-count">
        {((recordingStartTimestamp ? currentTime - recordingStartTimestamp : 0) / 1000).toFixed(1)}s
      </div>
    </div>
    <style jsx>{`
    @keyframes recording {
      0% {
        width: 0%;
      }
      100% {
        width: 100%;
      }
    }
    .counter {
      position: relative;
      width: 20%;
      height: calc(100% - 16px);
      margin: 8px 0px 8px 0px;
      background-color: black;
    }
    .progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: ${theme.palette.secondary.main};
      animation: recording 300000ms 1;
      animation-timing-function: linear;
    }
    .seconds-count {
      color: white;
      text-align: center;
      font-family: 'Roboto Mono', monospace;
      font-size: 14px;
      padding: 2px;
      font-weight: 600;
      position: absolute;
      width: 100%;
      height: calc(100% - 16px);
      top: 0;
      left: 0;
    }
    `}</style>
  </>;
}