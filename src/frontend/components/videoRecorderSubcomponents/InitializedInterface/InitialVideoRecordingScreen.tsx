import { PreviewStaticPhotoScreen } from "../VideoRecorderBase/PreviewStaticPhotoScreen";
import { PreviewStreamScreen } from "../VideoRecorderBase/PreviewStreamScreen";
import { VideoRecorderComponentProps } from "../VideoRecorderBase/VideoRecorderBase";

export default function InitialVideoRecordingScreen({videoObject, sharedState}: VideoRecorderComponentProps) {
  const showPreview = sharedState.showPreview.value;
  console.log(showPreview);
  return showPreview ? <PreviewStreamScreen sharedState={sharedState} videoObject={videoObject}/> : <PreviewStaticPhotoScreen />
}