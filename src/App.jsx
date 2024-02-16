import Header from "./components/Header";
import Quiz from "./components/Quiz";
import QuizContextProvider from "./store/Quiz-Context-2.jsx";

function App() {
  return (
    <>
      <Header></Header>
      <QuizContextProvider>
        <Quiz></Quiz>
      </QuizContextProvider>
    </>
  );
}

export default App;
