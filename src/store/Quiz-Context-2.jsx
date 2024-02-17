import { useReducer, createContext, useCallback } from "react";
import QUESTIONS from "../questions.js";

export const QuizContext = createContext({
  userAnswers: [],
  answerState: "",
  handleOnAnswer: () => {},
  handleSkipAnswer: () => {},
});

function QuizReducer(state, action) {
  switch (action.type) {
    case "ON_ANSWER":
      return {
        ...state,
        userAnswers: [...state.userAnswers, action.payload.answer],
        answerState: action.payload.answer ? "answered" : "", // This might be adjusted based on actual logic needed
      };
    case "CHANGE_ANSWER_STATE":
      return {
        ...state,
        answerState: action.payload.answerState,
      };
    case "ON_SKIP":
      return {
        userAnswers: [],
        answerState: "",
      };
    default:
      return state;
  }
}

export default function QuizContextProvider({ children }) {
  const [quizState, quizDispatch] = useReducer(QuizReducer, {
    userAnswers: [],
    answerState: "",
  });

  const handleOnAnswer = useCallback(
    (answer) => {
      const qId = quizState.userAnswers.length; // Adjusted to reflect current question ID before update
      const isCorrect = answer === QUESTIONS[qId]?.answers[0]; // Safe access in case of out-of-bound index

      quizDispatch({
        type: "ON_ANSWER",
        payload: { answer },
      });
      if (!answer) return;
      // Update answer state with a single dispatch for improved efficiency
      setTimeout(() => {
        quizDispatch({
          type: "CHANGE_ANSWER_STATE",
          payload: {
            answerState: isCorrect ? "correct" : "wrong",
          },
        });

        setTimeout(() => {
          quizDispatch({
            type: "CHANGE_ANSWER_STATE",
            payload: { answerState: "" },
          });
        }, 2000);
      }, 1000);
    },
    [quizState]
  ); // Dependency on userAnswers.length to ensure correct question ID calculation

  const handleSkipAnswer = useCallback(
    () => handleOnAnswer(null),
    [handleOnAnswer]
  );
  function handleOnSkip() {
    quizDispatch({
      type: "ON_SKIP",
    });
  }

  const quizCtxValue = {
    userAnswers: quizState.userAnswers,
    answerState: quizState.answerState,
    handleOnAnswer: handleOnAnswer,
    handleSkipAnswer: handleSkipAnswer,
  };

  return (
    <QuizContext.Provider value={quizCtxValue}>{children}</QuizContext.Provider>
  );
}
