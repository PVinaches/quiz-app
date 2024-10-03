import { useCallback, useState } from "react";
import Summary from "./Summary";
import Question from "./Question"
import questions from "../assets/questions";

export default function Quiz() {
  const [userAnswers, saveUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const completedQuiz = activeQuestionIndex === questions.length;
  
  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(chosenAnswer) {
    saveUserAnswers((prevAnswers) => {
      return [...prevAnswers, chosenAnswer];
    });
  }, [])
  
  const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);
  
  if (completedQuiz) return (<Summary userAnswers={userAnswers} />);
  
  return (
    <div id="quiz">
      <Question key={activeQuestionIndex} questionIndex={activeQuestionIndex} onSelectAnswer={handleSelectedAnswer}
       handleSkipAnswer={handleSkipAnswer} ></Question>
    </div>
  );
}