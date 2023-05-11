interface QuestionNavigatorProps {
  question: {
    id: string;
    content: string;
    category: string;
  }
}

export default function QuestionNavigator(props: QuestionNavigatorProps) {
  return <div>
    {props.question.content}
  </div>
}