import PropTypes from "prop-types";
import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import questions from "../assets/questions";

export default function Question({ questionIndex, onSelectAnswer, handleSkipAnswer }) {
  const [answer, setAnswer] = useState({ selectedAnswer: '', isCorrect: null });
  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect != null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      const isCorrect = answer === questions[questionIndex].answers[0] ? 'correct' : 'wrong';
      setAnswer({ selectedAnswer: answer, isCorrect: isCorrect });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect;
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer key={timer} timeout={timer}
       onTimeout={handleSkipAnswer}
       mode={answerState} />
      <h2>{questions[questionIndex].text}</h2>
      <Answers answers={questions[questionIndex].answers} selectedAnswer={answer.selectedAnswer} 
        answerState={answerState} handleSelectedAnswer={handleSelectAnswer} />
    </div>
  );
};

Question.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  onSelectAnswer: PropTypes.func.isRequired,
  handleSkipAnswer: PropTypes.func.isRequired
};