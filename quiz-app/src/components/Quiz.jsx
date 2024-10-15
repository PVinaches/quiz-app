import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import Summary from "./Summary";
import Question from "./Question"
import { useQuizesContext } from "../context/questions-context";

export default function Quiz({ quizNumber }) {
  const { getItem, error } = useQuizesContext();
  const [thisQuiz, setThisQuiz] = useState([]);
  const [userAnswers, saveUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  useEffect(() => {
    const fetchQuestionaire = async (quizNumber) => {
      try {
        const quiz = await getItem(quizNumber);
        setThisQuiz(quiz);
      } catch (err) {
        console.error('Fetch items error:', err);
      }
    };

    fetchQuestionaire(quizNumber);
  }, [getItem, quizNumber]);

  const completedQuiz = activeQuestionIndex === thisQuiz.questions.length;
  
  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(chosenAnswer) {
    saveUserAnswers((prevAnswers) => {
      return [...prevAnswers, chosenAnswer];
    });
  }, [])
  
  const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

  if (completedQuiz) return (<Summary userAnswers={userAnswers} currentQuiz={thisQuiz} />);
  
  return (
    <div id="quiz">
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {!error && <Question key={activeQuestionIndex} questionIndex={activeQuestionIndex} currentQuiz={thisQuiz}
       onSelectAnswer={handleSelectedAnswer} handleSkipAnswer={handleSkipAnswer} ></Question>}
    </div>
  );
}

Quiz.propTypes = {
  quizNumber: PropTypes.number.isRequired
}