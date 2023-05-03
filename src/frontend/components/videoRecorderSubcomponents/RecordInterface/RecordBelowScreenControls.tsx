import { BelowScreenControls } from "../VideoRecorderBase/BelowScreenControls";
import { PreviewToggler } from "../VideoRecorderBase/PreviewToggler";
import { VideoRecorderComponentProps } from "../VideoRecorderBase/VideoRecorderBase";

export function RecordBelowScreenControls({sharedState, videoObject}: VideoRecorderComponentProps) {
  
  const rightJustifiedButtons = [PreviewToggler];

  return <BelowScreenControls sharedState={sharedState} videoObject={videoObject} rightButtons={rightJustifiedButtons}/>
}