// import { Logo } from "./logo"
// import "../styles/header.scss"

import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/puzzle/zebra">Zebra Puzzle</Link>
          </li>
          <li>
            <Link to="/puzzle/personal-computer">Personal Computer Puzzle</Link>
          </li>
          <li>
            <Link to="/puzzle/movie-buffs">Movie Buffs Puzzle</Link>
          </li>
          <li>
            <Link to="/custom/new">Create puzzle</Link>
          </li>
          <li>
            <Link to="/custom">Custom puzzles</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
