import { useQuizContext } from "./contexts/QuizContext";

function Option() {
  const { questions, dispatch, answer, index } = useQuizContext();

  const hasAnswered = answer !== null;
  const correctOption = questions[index].correctOption;

  return (
    <div className="options">
      {questions[index].options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
