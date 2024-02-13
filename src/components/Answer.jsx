export default function Answer({ answers }) {
  return (
    <div id="answers">
      {answers.map((answer, id) => (
        <div className="answer" key={id}>
          <button>{answer}</button>
        </div>
      ))}
    </div>
  );
}
