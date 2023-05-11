import VideoRecorder from "./VideoRecorder";

interface AnswerNavigatorProps {
  questionId: string;
}

export default function AnswerNavigator({questionId}: AnswerNavigatorProps) {
  return <><div className="container">
    <div className="record-panel">
      <VideoRecorder questionId={questionId} />
    </div>
    <div className="plan-panel"></div>
    <div className="score-panel"></div>
  </div>
    <style jsx>{`
    .container {
      height: 100%;
    }
    .plan-panel {
      border: 1px solid red;
      height: 20%;
    }
    .record-panel {
      border: 1px solid gray;
      height: 60%;
    }
    .score-panel {
      border: 1px solid orange;
      height: 20%;
    }
    `}</style>
    </>
}