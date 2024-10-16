import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/home";
import CreateQuiz from "./pages/createQuiz";
import SelectQuiz from "./pages/selectQuiz";

const router = createBrowserRouter([
  { path: '',  element: <Homepage />},
  { path: '/createQuiz', element: <CreateQuiz />},
  { path: '/selectQuiz', element: <SelectQuiz />}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
