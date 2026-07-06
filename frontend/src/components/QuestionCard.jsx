export default function QuestionCard({ question }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <h3>Question:</h3>
      <p>{question}</p>
    </div>
  );
}