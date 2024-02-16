import { useContext } from "react";
import { QuizContext } from "../store/Quiz-Context-2";
import PropTypes from "prop-types";
export default function Answer({ answers }) {
  const { handleOnAnswer, answerState, userAnswers } = useContext(QuizContext);

  return (
    <ul id="answers">
      {answers.map((answer) => {
        const isSelected = userAnswers[userAnswers.length - 1] === answer;
        let cssclass = "";
        if (answerState === "answered" && isSelected) {
          cssclass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssclass = answerState;
        }

        return (
          <li className="answer" key={answer}>
            <button className={cssclass} onClick={() => handleOnAnswer(answer)}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
Answer.propTypes = {
  answers: PropTypes.array.isRequired,
  // If you know the shape of objects inside the answers array, you can use PropTypes.shape() to validate that as well
};
