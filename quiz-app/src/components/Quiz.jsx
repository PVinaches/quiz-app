import { useState } from "react";
import questions from "../assets/questions";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, saveUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const shuffledAnswers = [...questions[activeQuestionIndex].answers].sort(() => Math.random() - 0.5);

  function handleSelectedAnswer(answer) {
    saveUserAnswers((prevAnswers) => {
      return {...prevAnswers, answer};
    })
  }

  const completedQuiz = activeQuestionIndex === questions.length;

  return completedQuiz ? (
    <Summary />
  ) : (
    <div id="quiz">
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