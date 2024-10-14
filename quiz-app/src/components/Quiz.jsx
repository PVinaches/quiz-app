import { useCallback, useContext, useState } from "react";
import Summary from "./Summary";
import Question from "./Question"
import { QuizesContext } from "../context/questions-context";

export default function Quiz() {
  const [userAnswers, saveUserAnswers] = useState([]);
  const quizNumber = 0;
  const activeQuestionIndex = userAnswers.length;
  const completedQuiz = activeQuestionIndex === useContext(QuizesContext).quizes[quizNumber].questions.length;
  
  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(chosenAnswer) {
    saveUserAnswers((prevAnswers) => {
      return [...prevAnswers, chosenAnswer];
    });
  }, [])
  
  const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

  if (completedQuiz) return (<Summary userAnswers={userAnswers} quizNumber={quizNumber} />);
  
  return (
    <div id="quiz">
      <Question key={activeQuestionIndex} questionIndex={activeQuestionIndex} onSelectAnswer={handleSelectedAnswer}
       handleSkipAnswer={handleSkipAnswer} quizNumber={quizNumber} ></Question>
    </div>
  );
}