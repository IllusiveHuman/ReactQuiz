import { useEffect, useReducer } from 'react';
import Header from './Header'
import Loader from './Loader';
import Error from './Error';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';
import Progress from './Progress';
import FinisheScreen from './FinisheScreen';
import Footer from './Footer';
import Timer from './Timer';
import NextButton from './NextButton';

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconsdRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: 'ready' }
    case "dataFailed":
      return { ...state, status: 'error' }
    case "start":
      return { ...state, status: 'active', seconsdRemaining: state.questions.length * SECS_PER_QUESTION }
    case "newAnswer":
      const question = state.questions[state.index]

      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finished":
      return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore }
    case "restart":
      return { ...initialState, status: 'ready', questions: state.questions, highscore: state.points > state.highscore ? state.points : state.highscore }
    case 'tick':
      return { ...state, seconsdRemaining: state.seconsdRemaining - 1, status: state.seconsdRemaining === 0 ? "finished" : state.status, }
    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { questions, status, index, answer, points, highscore, seconsdRemaining } = state

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(function () {
    fetch('http://localhost:8000/questions').then(res => res.json()).then(data => dispatch({ type: 'dataRecieved', payload: data })).catch(err => dispatch({ type: "dataFailed" }))
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} seconsdRemaining={seconsdRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>)}
        {status === 'finished' && (
          <>
            <FinisheScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} />
          </>)}

      </Main>
    </div>
  );
}
