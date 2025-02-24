import { useEffect } from "react";
import { useQuizContext } from "./contexts/QuizContext";

function Timer() {
  const { dispatch, seconsdRemaining } = useQuizContext();

  const mins = Math.floor(seconsdRemaining / 60);
  const seconds = seconsdRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
