import { useQuizContext } from "./contexts/QuizContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuizContext();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
