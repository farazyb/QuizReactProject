import ProgrressBar from "./ProgressBar";
import { useEffect } from "react";
import questions from "../questions.js";
import Question from "./Question.jsx";
export default function Quiz() {
  return (
    <section id="quiz">
      {console.log(
        questions.find((qu) => {
          return qu.id === "q1";
        })
      )}
      <Question
        question={questions.find((qu) => {
          return qu.id === "q1";
        })}
      ></Question>
      <div id="skip-action">
        <button>Skip</button>
      </div>
    </section>
  );
}
