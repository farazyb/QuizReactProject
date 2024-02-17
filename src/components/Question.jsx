/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import ProgressBar from "./ProgressBar";
import Answer from "./Answer.jsx";
import { QuizContext } from "../store/Quiz-Context-2.jsx";
import { useContext } from "react";

export default function Question({ question }) {
  const { answerState, handleSkipAnswer, handleOnAnswer, userAnswers } =
    useContext(QuizContext);
  let TIME = 10000;
  if (answerState === "answered") {
    TIME = 1000;
  }
  if (answerState === "correct" || answerState === "wrong") {
    TIME = 2000;
  }
  const selectedAnswer =
    answerState === "" ? null : userAnswers[userAnswers.length - 1];

  return (
    <div id="question">
      <ProgressBar
        mode={answerState}
        key={question.id + answerState}
        timeOut={TIME}
        onTimeOut={answerState === "" ? handleSkipAnswer : null}
      ></ProgressBar>
      <h2>{question.text}</h2>
      <Answer
        handleOnAnswer={handleOnAnswer}
        userAnswers={userAnswers}
        answerState={answerState}
        answers={question.answers}
      ></Answer>
    </div>
  );
}
