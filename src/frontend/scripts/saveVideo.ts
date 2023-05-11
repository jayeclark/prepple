import axios, { AxiosResponse } from "axios";
import { User } from "./context";
import { API_URL } from "../constants/app";
import { SyntheticEvent } from "react";
import { VideoPlayerState } from "../constants/app";

export async function saveVideoToS3(mediaBlobUrl: string, user: User) {
    const mediaBlob: Blob = await fetch(mediaBlobUrl as string).then (res => res.blob());
    const dateStamp: number = new Date(Date.now()).getTime();
    const fileName = `${user.id}-${dateStamp}`;
    const file = new File([mediaBlob], `${fileName}.mp4`, { type: 'video/mp4' });

    const formData = new FormData();
    formData.append("file", file);

    const s3result: Response = await fetch(`/api/put-s3?id=${user.id}`, {
      method: "POST",
      body: formData
    })
  const response = await s3result.json();
  return response;
}

interface RecordSaveForm extends EventTarget {
  title: HTMLInputElement;
  rating: HTMLInputElement;
}

interface SaveS3KeyToPostgresProps {
  event: SyntheticEvent,
  user: User,
  questionId: string,
  answerId: string,
  s3UploadResult: Record<string, unknown>,
}

export async function saveS3KeyToPostgres(props: SaveS3KeyToPostgresProps) {
  const { user, questionId, answerId, event, s3UploadResult } = props;
      const answerBody = {
      data: {
          users_permissions_user: user.id,
          user_id: user.id,
          question: questionId,
          title: (event.target as RecordSaveForm).title.value,
      }
    }
    const headers = {
      Authorization: `Bearer ${user.jwt}`
    }
    let id = answerId;
    if (!id) {
      const res = await axios.post(`${API_URL}/api/answers`, answerBody, { headers });
      const data = await res.data
      const answer = await data.answer
      id = await answer.id
    }
    const videoBody = {
      data: {
          s3key: s3UploadResult.filename,
          users_permissions_user: user.id,
          user_id: user.id,
          datetime: new Date(Date.now()).getTime(),
          question: questionId,
          rating: (event.target as RecordSaveForm).rating.value,
          answer: id,        
      }
    }

  let result: AxiosResponse<any, any> = await axios.post(`${API_URL}/api/videos`, videoBody, { headers }).then((response) => {
    return response;
  }).catch((e: unknown) => {
    throw new Error("Error saving video data to database.")
  }) 

  return result;
}