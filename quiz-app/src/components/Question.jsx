import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import questions from "../assets/questions";

export default function Question({ questionIndex, onSelectAnswer, handleSkipAnswer }) {
  const [answer, setAnswer] = useState({ selectedAnswer: '', isCorrect: null });

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      const isCorrect = answer === questions[questionIndex].answers[0] ? 'correct' : 'wrong';
      setAnswer({ selectedAnswer: answer, isCorrect: isCorrect });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }, [questionIndex, onSelectAnswer]);

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect;
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeOut={handleSkipAnswer} />
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