/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import ProgressBar from "./ProgressBar";
import Answer from "./Answer.jsx";
import { QuizContext } from "../store/Quiz-Context-2.jsx";
import { useContext, useEffect } from "react";

export default function Question({ question }) {
  const { answerState, handleOnAnswer } = useContext(QuizContext);
  let TIME = 5000;
  if (answerState === "answered") {
    TIME = 1000;
  }
  if (answerState === "correct" || answerState === "wrong") {
    TIME = 2000;
  }
  console.log(answerState);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (answerState === "") {
        handleOnAnswer(null);
      }
    }, TIME);
    return () => {
      clearTimeout(timeOut);
    };
  }, [TIME, answerState, handleOnAnswer]);
  return (
    <div id="question">
      <ProgressBar
        key={question.id}
        state={answerState}
        time={TIME}
      ></ProgressBar>
      <h2>{question.text}</h2>
      <Answer answers={question.answers}></Answer>
    </div>
  );
}
