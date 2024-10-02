import PropTypes from "prop-types";
import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, handleSelectedAnswer }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
          let className = '';
          if (answer === selectedAnswer) {
            switch (answerState) {
              case 'answered':
                className = 'selected';
                break;
              case 'correct':
                className = 'correct';
                break;
              case 'wrong':
                className = 'wrong';
                break;
              default:
                className = '';
                break;
            }
          }
          
          return (<li className="answer" key={answer}>
            <button onClick={() => handleSelectedAnswer(answer)} className={className} 
              disabled={answerState != ''} >{answer}</button>
          </li>);
        })}
      </ul>
  );
};

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  selectedAnswer: PropTypes.string,
  answerState: PropTypes.string,
  handleSelectedAnswer: PropTypes.func.isRequired
};