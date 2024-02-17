import ProgrressBar from "./ProgressBar";
import { useEffect, useContext } from "react";
import questions from "../questions.js";
import Question from "./Question.jsx";
import { QuizContext } from "../store/Quiz-Context-2.jsx";
import SummaryModal from "./SummaryModal.jsx";
export default function Quiz() {
  const { userAnswers, answerState } = useContext(QuizContext);
  const activeQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isQuizComplete = userAnswers.length === questions.length;
  return (
    <section id="quiz">
      {!isQuizComplete ? (
        <Question question={questions[activeQuestion]}></Question>
      ) : (
        <>
          <SummaryModal userAnswers={userAnswers}></SummaryModal>
          <h2>Quiz End !</h2>
        </>
      )}
    </section>
  );
}
