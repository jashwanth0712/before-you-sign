import React from "react";

function Navbar({ onButtonClick }) {
  return (
    <nav className="h-[100px]">
    <div className="navbar">
      <button onClick={() => onButtonClick(1)}>Ai Lawyer</button>
      <button onClick={() => onButtonClick(2)}>Highlighter</button>
      <button onClick={() => onButtonClick(3)}>Generate</button>
    </div>
    </nav>
  );
}

export default Navbar;