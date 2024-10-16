import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import SelectQuiz from "./pages/SelectQuiz";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  { path: '/',  element: <RootLayout />, children: [
    { path: '/', element: <Homepage />},
    { path: '/createQuiz', element: <CreateQuiz />},
    { path: '/selectQuiz', element: <SelectQuiz />}
  ]},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
