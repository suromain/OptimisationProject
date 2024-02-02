import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/error.tsx";
import PersonalComputer from "./components/personal-computer.tsx";
import Zebra from "./components/zebra/Zebra.tsx";
import CustomProblem from "./components/custom/CustomProblem.tsx";
import CustomProblems from "./components/custom/CustomProblems.tsx";
import Home from "./components/home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "puzzle/zebra",
        element: <Zebra />,
      },
      {
        path: "puzzle/personal-computer",
        element: <PersonalComputer />,
      },
      {
        path: "custom/:id",
        element: <CustomProblem />,
      },
      { path: "custom", element: <CustomProblems /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
