import React from "react";

function Navbar({ onButtonClick }) {
  return (
<<<<<<< HEAD
    <nav className="h-[40px]">
=======
    <nav className="h-[40px] rounded-lg w-full text-center bg-gradient-to-r from-black via-purple-950 to-black backdop-blur-lg pt-1">
>>>>>>> c20dec950cca37bd9543c072d4412dcd7f9e5866
      <div className="navbar">
        <button onClick={() => onButtonClick(1)} className="bg-white mr-3 pl-2 pr-2 font-grotesk rounded-lg font-medium text-base text-black p-1">Ai Lawyer</button>
        <button onClick={() => onButtonClick(2)} className="bg-white mr-3 pl-2 pr-2 font-grotesk rounded-lg font-medium text-base text-black p-1">Highlighter</button>
        <button onClick={() => onButtonClick(3)} className="bg-white mr-3 pl-2 pr-2 font-grotesk rounded-lg font-medium text-base text-black p-1">Generate</button>
      </div>
    </nav>
  );
}

export default Navbar;