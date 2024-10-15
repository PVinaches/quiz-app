import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {

  return (
    <>
      <Header></Header>
      
      <main>
        <Quiz quizNumber={0} ></Quiz>
      </main>
    </>
  )
}

export default App;
