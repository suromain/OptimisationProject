// import { Logo } from "./logo"
// import "../styles/header.scss"

export function Header() {
  return (
    <>
      {/*<Logo/>*/}
      <div>
        <ul>
          <li>
            <a href={"/"} className="header-link">
              <span> Home </span>
            </a>
          </li>
          <li>
            <a href={"/puzzle/zebra"} className="header-link">
              <span> Zebra Puzzle </span>
            </a>
          </li>
          <li>
            <a href={"/puzzle/personal-computer"} className="header-link">
              <span> Personal Computer Puzzle </span>
            </a>
          </li>
          <li>
            <a href={"/puzzle/movie-buffs"} className="header-link">
              <span> Movie Buffs Puzzle </span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}