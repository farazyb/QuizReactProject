/* eslint-disable no-undef */
import { useReducer, createContext } from "react";
import questions from "../questions.js";
import { useCallback } from "react";
export const QuizContext = createContext({
  qIndex: 0,
  questions: [],
  handleSkip: () => {},
  handleTimeOut: () => {},
  handleOnAnswer: () => {},
  state: undefined,
});
function QuizReducer(state, action) {
  // Common action for adding a new question
  const addQuestion = (newState) => ({
    ...state,
    questions: [
      ...state.questions,
      {
        id: newState.id,
        answer: newState.answer,
      },
    ],
  });

  switch (action.type) {
    case "SKIP":
      return {
        qIndex: 0, // Update index if the quiz is not at the end
        state: undefined,
        questions: [], // Spread operator to conditionally add properties
      };

    case "TIME_OUT": {
      const nextIndex = state.qIndex + 1;
      const isQuizEnd = nextIndex >= questions.length; // Assuming 'questions' is accessible in this scope
      return {
        ...addQuestion(action.payload.question),
        qIndex: isQuizEnd ? state.qIndex : nextIndex, // Update index if the quiz is not at the end
        ...(isQuizEnd && { state: "END" }), // Spread operator to conditionally add properties
      };
    }
    case "ANSWER": {
      return {
       ... state,
        state: action.payload.state,
      }; // Assuming 'questions' is accessible in this scope
    }

    default:
      return state;
  }
}
export default function QuizContextProvider({ children }) {
  const [quizState, quizdispatch] = useReducer(QuizReducer, {
    qIndex: 0,
    state: undefined,
    questions: [],
  });
  function handleSkip() {
    quizdispatch({
      type: "SKIP",
    });
  }
  function handleOnAnswer(id) {
    // eslint-disable-next-line no-undef
    console.log(id);
    quizdispatch({
      type: "ANSWER",
      payload: {
        state: "answered",
      },
    });
  }
  const handleOnTimeOut = useCallback(function handleOnTimeOut() {
    console.log("TIME_OUT");
    quizdispatch({
      type: "TIME_OUT",
      payload: {
        question: {
          id: quizState.qIndex,
          answer: "wrong",
        },
      },
    });
  });
  const quizCtxValue = {
    qIndex: quizState.qIndex,
    handleSkip: handleSkip,
    handleTimeOut: handleOnTimeOut,
    questions: quizState.questions,
    state: quizState.state,
    handleOnAnswer: handleOnAnswer,
  };
  return (
    <QuizContext.Provider value={quizCtxValue}>{children}</QuizContext.Provider>
  );
}
