import PropTypes from "prop-types";
import { useContext } from "react";
import { QuizesContext } from "../context/questions-context";
import quizCompleteImg from '../assets/quiz-complete.png'

export default function Summary({ userAnswers, quizNumber }) {
  const currentQuiz = useContext(QuizesContext).quizes[quizNumber];

  let skipped = 0, correct = 0;
  userAnswers.map((answer, id) => {
    if (answer === null) {
      skipped++;
    } else if (answer === currentQuiz.questions[id].answers[0]) {
      correct++;
    }
  });

  skipped = Math.round(skipped * 100 / userAnswers.length);
  correct = Math.round(correct * 100 / userAnswers.length);

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="quiz-complete" />
      <h2>Quiz completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skipped}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correct}%</span>
          <span className="text">answered correct</span>
        </p>
        <p>
          <span className="number">{100 - skipped - correct}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>

      <ol>
        {userAnswers.map((answer, id) => {
          let className = 'user-answer';
          if (answer === null) {
            className += ' skipped';
          } else if (answer === currentQuiz.questions[id].answers[0]) {
            className += ' correct';
          } else {
            className += ' wrong';
          }

          return (
            <li key={id} >
              <h3>{id + 1}</h3>
              <p className="question">{currentQuiz.questions[id].text}</p>
              <p className={className} >{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

Summary.propTypes = {
  userAnswers: PropTypes.array.isRequired,
  quizNumber: PropTypes.number.isRequired
}