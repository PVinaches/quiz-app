import { useCallback, useState } from "react";
import questions from "../assets/questions";
import Summary from "./Summary";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, saveUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const completedQuiz = activeQuestionIndex === questions.length;
  
  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(chosenAnswer) {
    saveUserAnswers((prevAnswers) => {
      return [...prevAnswers, chosenAnswer];
    })
  }, [])
  
  const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);
  
  if (completedQuiz) return (<Summary />);

  const shuffledAnswers = [...questions[activeQuestionIndex].answers].sort(() => Math.random() - 0.5);
  
  return (
    <div id="quiz">
      <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeOut={handleSkipAnswer} />
      <div id="question">
        <h2>{questions[activeQuestionIndex].text}</h2>
      </div>
      <ul id="answers">
        {shuffledAnswers.map((answer) => (
          <li className="answer" key={answer}>
            <button onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}