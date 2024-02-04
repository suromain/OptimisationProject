import './App.css'
import {Header} from "./components/Header.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "./components/Footer.tsx";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
