import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Error from "./components/error.tsx";
import Home from "./components/home.tsx";
import Zebra from "./components/zebra.tsx";
import PersonalComputer from "./components/personal-computer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/puzzle/zebra",
        element:<Zebra/>
      },
      {
        path:"/puzzle/personal-computer",
        element:<PersonalComputer/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
