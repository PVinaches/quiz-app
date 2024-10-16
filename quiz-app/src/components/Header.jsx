import { Link } from "react-router-dom";
import './header.css';
import quizLogo from '../assets/quiz-logo.png';

export default function Header() {
  return (
    <header>
      <div>
        <Link to="/">
          <img src={quizLogo} alt="logo-quiz" />
        </Link>
        <h1>Quiz App</h1>
      </div>
      <div>
        <Link to="/selectQuiz" className="button-quiz">Select a quiz</Link>
        <Link to="/createQuiz" className="button-quiz">Create a new quiz</Link>
      </div>
    </header>
  );
}