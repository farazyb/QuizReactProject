import { useState ,useEffect} from "react";
import PropTypes from "prop-types";
export default function Answer({ answers, userAnswers, handleOnAnswer, answerState }) {

  
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    // Clone the answers array and shuffle it
    const shuffle = [...answers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffle);
  }, [answers]);

  return (
    <ul id="answers">
      {shuffledAnswers.map((answer) => {
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
            <button
              className={cssclass}
              onClick={() => handleOnAnswer(answer)}
              disabled={answerState !== "" }
            >
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
