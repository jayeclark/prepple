import { Button } from "@mui/material";

export function RecordingIndicator() {
  return <>
    <div className="blinking"><Button><div className="recording-indicator"></div></Button></div>
    <style jsx>{`
    @keyframes blink {
      0% {
        background-color: rgba(255, 0, 0, 1);
      }
      60% {
        background-color: rgba(255, 0, 0, 1);
      }
      80% {
        background-color: rgba(255, 0, 0, 0);
      }
      100% {
        background-color: rgba(255, 0, 0, 1);
      }
    }
    .blinking {
        position: absolute;
        top: 20px;
        right: 10px;
        
      }
    .recording-indicator {
      background-color: red;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      outline: 1px solid red;
      animation: blink 2000ms infinite;
    }
    `}</style>
    </>
    ;
}