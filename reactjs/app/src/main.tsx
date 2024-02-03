import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error.tsx";
import Home from "./components/Home.tsx";
import PersonalComputer from "./components/PersonalComputer.tsx";
import Zebra from "./components/zebra/Zebra.tsx";
import CustomProblem from "./components/custom/CustomProblem.tsx";
import CustomProblems from "./components/custom/CustomProblems.tsx";
import sdk from "./utils/sdk.ts";

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
        loader: async () => {
          const api = sdk.personalComputer;
          const response = await api.getConstraints();
          return {constraints: response.constraints};
        }
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
