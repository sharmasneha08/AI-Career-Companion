export default function AnswerBox({ value, setValue }) {
  return (
    <div>
      <h3>Your Answer:</h3>
      <textarea
        rows="5"
        cols="50"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your answer here..."
      />
    </div>
  );
}