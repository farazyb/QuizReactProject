import ProgrressBar from "./ProgressBar";

import Answer from "./Answer.jsx";
export default function Question({ question }) {
  return (
    
    <div id="question-overview">
        {console.log(question)}
      <div id="question">
        <ProgrressBar time={5000}></ProgrressBar>
        <h2>{question.text}</h2>
        <Answer answers={question.answers}></Answer>
      </div>
    </div>
  );
}
