import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { RouterProvider, createHashRouter } from "react-router-dom";
const routes = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
