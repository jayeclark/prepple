import { SyntheticEvent } from "react";
import { MediaState, VideoPlayerState } from "../../../constants/app";
import { User } from "../../../scripts/context";

export interface SharedState {
  showPreview: {
    value: boolean,
    setter: (b: boolean) => void,
  },
  photoPreviewUrl: {
    value: string | null,
    setter: (s: string) => void,
  },
  showSaveDialog: {
    value: boolean,
    setter: (b: boolean) => void,
  },
  videoRecorderMode: {
    value: VideoPlayerState,
    setter: (v: VideoPlayerState) => void,
  },
  mediaStatus: {
    value: MediaState,
    setter: (m: MediaState) => void
  },
  recordingStartTimestamp: {
    value: number | null,
    setter: (time: number | null) => void,
  },
  user: {
    value: User
  },
  questionId: {
    value: string
  },
  answerId?: {
    value?: string
  },
  handleNextQuestion: (e: SyntheticEvent) => void
}
  
export interface VideoObject {
  mediaBlobUrl: string | null;
  previewStream: MediaStream | null;
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  clearBlobUrl: () => void;
}

export interface VideoRecorderComponentProps {
  sharedState: SharedState;
  videoObject: VideoObject;
}

export interface InScreenControlsProps extends VideoRecorderComponentProps {
  start?: () => void;
  pause?: () => void;
  resume?: () => void;
  end?: () => void;
}
