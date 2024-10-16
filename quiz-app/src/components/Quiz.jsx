import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useQuizesContext } from "../context/questions-context";
import { useFetch } from "../hooks/useFetch";
import Question from "./Question"
import Summary from "./Summary";

export default function Quiz({ quizNumber }) {
  const { getItem, error } = useQuizesContext();
  const [thisQuiz, setThisQuiz] = useState(null);
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [userAnswers, saveUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const fetchQuestionaire = async (quizNumber) => {
    try {
      const quiz = await getItem(quizNumber);
      return quiz;
    } catch (err) {
      console.error('Fetch items error:', err);
    }
  };

  const { fetchedData, isFetching, fetchingError } = useFetch(fetchQuestionaire, [quizNumber], null);

  useEffect(() => {
    if (fetchedData) {
      setThisQuiz(fetchedData);
      setCompletedQuiz(activeQuestionIndex === fetchedData.questions.length);
    }
  }, [fetchedData, activeQuestionIndex, isFetching, fetchingError])
  
  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(chosenAnswer) {
    saveUserAnswers((prevAnswers) => {
      return [...prevAnswers, chosenAnswer];
    });
  }, [])

  const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (fetchingError) {
    return <div>Error: {fetchingError.message}</div>;
  }

  if (thisQuiz && completedQuiz) return (<Summary userAnswers={userAnswers} currentQuiz={thisQuiz} />);
  
  return (
    <div id="quiz">
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {!error && thisQuiz && <Question key={activeQuestionIndex} questionIndex={activeQuestionIndex} currentQuiz={thisQuiz}
       onSelectAnswer={handleSelectedAnswer} handleSkipAnswer={handleSkipAnswer} ></Question>}
    </div>
  );
}

Quiz.propTypes = {
  quizNumber: PropTypes.number.isRequired
}