import quizCompleteImg from '../assets/quiz-complete.png'

export default function Summary() {
  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="quiz-complete" />
      <h2>Quiz completed!</h2>
    </div>
  );
}