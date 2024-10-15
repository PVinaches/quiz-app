/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useIndexedDB } from "../hooks/useIndexedDB";

// Create the Context
const QuizesContext = createContext();

// Custom hook to use the IndexedDB Context
export const useQuizesContext = () => {
  return useContext(QuizesContext);
};

export default function QuizesProvider({ children, storeName, version }) {
  const indexedDB = useIndexedDB(storeName, version);

  return (
    <QuizesContext.Provider value={indexedDB} >
      {children}
    </QuizesContext.Provider>
  );
};