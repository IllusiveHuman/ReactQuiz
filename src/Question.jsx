import { useQuizContext } from "./contexts/QuizContext";
import Option from "./Option";

function Question() {
  const { questions } = useQuizContext();
  return (
    <div>
      <h4>{questions.question}</h4>
      <Option />
    </div>
  );
}

export default Question;
