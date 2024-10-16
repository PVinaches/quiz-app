import Quiz from "../components/Quiz";

export default function Homepage() {
  const quizNumber = 0;

  return (
    <main>
      <h1>My homepage</h1>
      
      <Quiz quizNumber={quizNumber} ></Quiz>
    </main>
  );
}