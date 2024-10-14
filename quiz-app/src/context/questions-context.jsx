/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import questions from "../assets/questions";

export const QuizesContext = createContext({
  quizes: []
});

export default function QuizesProvider({ children }) {
  const [quizList, setQuizes] = useState([
    {
      id: 0,
      questions: questions
    }
  ]);

  if (quizList.length === 0) setQuizes(null);

  return (
    <QuizesContext.Provider value={{ quizes: quizList }}>
      {children}
    </QuizesContext.Provider>
  );
};