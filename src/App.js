
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
import { useQuizContext } from './contexts/QuizContext';


export default function App() {
  const { status } = useQuizContext()
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>)}
        {status === 'finished' && (
          <>
            <FinisheScreen />
          </>)}

      </Main>
    </div>
  );
}
