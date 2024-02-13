export default function Answer({ answers }) {
  return (
    <div id="answers">
      {answers.map((answer, id) => (
        <div className="answer" key={id}>
          <button className="correct">{answer}</button>
        </div>
      ))}
    </div>
  );
}
