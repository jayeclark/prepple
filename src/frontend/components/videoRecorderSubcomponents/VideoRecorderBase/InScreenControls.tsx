import { JSXElementConstructor } from "react";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { MediaState, VideoPlayerState } from "../../../constants/app";

interface InScreenControlsProps extends VideoRecorderComponentProps {
  iconButtons?: ((JSXElementConstructor<VideoRecorderComponentProps>) | (JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>))[];
  textButtons?: ((JSXElementConstructor<VideoRecorderComponentProps>) | (JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>))[];
}

export function InScreenControls({sharedState, iconButtons, textButtons, videoObject}: InScreenControlsProps) {

  const playerIsInRecordMode = sharedState.videoRecorderMode.value === VideoPlayerState.RECORDING;
  const mediaIsInStoppedOrPausedState = sharedState.mediaStatus.value == MediaState.STOPPED;
  const recordingIsStopped = playerIsInRecordMode && mediaIsInStoppedOrPausedState;

  return <><div className="in-screen-video-controls">
    <div className="text-button-container">
      {textButtons?.map((TextButton: ((JSXElementConstructor<VideoRecorderComponentProps>) | (JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>)), i: number) => (
        <TextButton key={`inscreen-button-${i}`} sharedState={sharedState} videoObject={videoObject} />
      ))}
    </div>
    <div className="icon-button-strip">
      {iconButtons?.map((IconButton: ((JSXElementConstructor<VideoRecorderComponentProps>) | (JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>)), i: number) => (
        <IconButton key={`inscreen-button-${i}`} sharedState={sharedState} videoObject={videoObject} />
      ))}
    </div>
  </div>
    <style jsx>{`
      .in-screen-video-controls {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
      }
      .text-button-container {
        position: relative;
        height: calc(100% - 40px);
        padding: 30px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        background-color: rgba(0,0,0,${recordingIsStopped ? 0.6 : 0})
      }
      .icon-button-strip {
        height: 40px;
        width: 100%;
        background-color: rgba(0,0,0, 0.6);
        color: white;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        padding-left: ${sharedState.videoRecorderMode.value == VideoPlayerState.RECORDING && sharedState.mediaStatus.value == MediaState.STREAMING ? "calc(20% - 16px)" : "0"}
      }
      `}</style>
    </>;
}