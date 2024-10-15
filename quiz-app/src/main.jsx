import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import QuizesProvider from './context/questions-context'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizesProvider storeName="quizes" version={1} >
      <App />
    </QuizesProvider>
  </StrictMode>,
)
