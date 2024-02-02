import "../styles/header.css"

import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="menu">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/puzzle/zebra">Zebra Puzzle</Link>
      </div>
      <div>
        <Link to="/puzzle/personal-computer">Personal Computer Puzzle</Link>
      </div>
      <div>
        <Link to="/puzzle/movie-buffs">Movie Buffs Puzzle</Link>
      </div>
      <div>
        <Link to="/custom/new">Create puzzle</Link>
      </div>
      <div>
        <Link to="/custom">Custom puzzles</Link>
      </div>
    </div>
  )
}