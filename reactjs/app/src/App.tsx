import './App.css'
import {Header} from "./components/header.tsx";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
