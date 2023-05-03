import Image from "next/image";
import StaticPhoto from "../../../assets/StaticPhotoInterviewer.jpg";
import { VideoRecorderComponentProps } from "./VideoRecorderBase";

export function PreviewStaticPhotoScreen({sharedState}: Omit<VideoRecorderComponentProps, "videoObject">) {
  return sharedState.photoPreviewUrl.value === null ? <FakePersonPhotoScreen /> : <ScreenCapturePhotoScreen photoUrl={sharedState.photoPreviewUrl.value} />
}

function FakePersonPhotoScreen() {
  return <>
    <div className="fake-person">
      <Image fill style={{objectFit: "cover"}} alt="fake person" src={StaticPhoto} />
    </div>
  </>
}

interface ScreenCapturePhotoScreenProps {
  photoUrl: string | null;
}

function ScreenCapturePhotoScreen({ photoUrl }: ScreenCapturePhotoScreenProps) {
  if (photoUrl === null) {
    return <FakePersonPhotoScreen />
  }
  return <>
    <div className="screen-capture">
      <Image fill style={{objectFit: "cover"}} alt="video frame capture" src={photoUrl} />
    </div>
  </>
}