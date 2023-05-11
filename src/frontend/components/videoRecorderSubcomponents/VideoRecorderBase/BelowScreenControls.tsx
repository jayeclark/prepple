import { JSXElementConstructor } from "react";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";
import { useTheme } from "@mui/material";

interface BelowScreenControlsProps extends VideoRecorderComponentProps {
  leftButtons?: ((JSXElementConstructor<VideoRecorderComponentProps>) | (JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>))[];
  rightButtons?: ((JSXElementConstructor<VideoRecorderComponentProps>) | (JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>))[];
}

export function BelowScreenControls({sharedState, videoObject, leftButtons, rightButtons}: BelowScreenControlsProps) {

  const theme = useTheme();

  return <><div className="below-screen-video-controls">
    <div className="left-controls">
      {leftButtons?.map((LeftJustifiedButton: ((JSXElementConstructor<VideoRecorderComponentProps>) | (JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>)), i: number) => (
        <LeftJustifiedButton key={`inscreen-button-${i}`} sharedState={sharedState} videoObject={videoObject} />
      ))}
    </div>
    <div className="right-controls">
      {rightButtons?.map((RightJustifiedButton: ((JSXElementConstructor<VideoRecorderComponentProps>) | (JSXElementConstructor<Omit<VideoRecorderComponentProps, "videoObject">>)), i: number) => (
        <RightJustifiedButton key={`inscreen-button-${i}`} sharedState={sharedState} videoObject={videoObject} />
      ))}
    </div>
  </div>
    <style jsx>{`
      .below-screen-video-controls {
        position: absolute;
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: top;
      }
      .left-controls {
        display: flex;
        justify-content: left;
        height: 100%;
        margin: 0px ${theme.spacing(-1)} 0px ${theme.spacing(-1)};
      }
      .right-controls {
        display: flex;
        justify-content: right;
        height: 100%;
        margin: 0px ${theme.spacing(-1)} 0px ${theme.spacing(-1)};
      }
      `}</style>
    </>;
}




