import { useQuizContext } from "./contexts/QuizContext";

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuizContext();

  if (answer === null) return;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}>
        Finish
      </button>
    );
}

export default NextButton;
