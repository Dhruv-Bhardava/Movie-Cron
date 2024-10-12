import "./App.css";
import Home from "./Home"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SingleMovie from "./SingleMovie";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/movie/:id',
      element: <SingleMovie />
    }
  ])

  return <RouterProvider router={router} />
}

export default App;
