import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Me from "./pages/Me";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: '/me',
    element: <Me/>,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
