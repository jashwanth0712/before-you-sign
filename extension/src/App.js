import React, { useState } from "react";
import "./App.css";
import ChatUI from "./pages/ChatUI";
import Navbar from "./components/Navbar";
import Generate from "./pages/Generate";
import HighLighter from "./pages/HighLighter";
function App() {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (buttonNumber) => {
    setClickedButton(buttonNumber);
  };

  return (
    <div className="App">
      <Navbar onButtonClick={handleButtonClick} />
        {clickedButton===1 && <ChatUI/>}
        {clickedButton===2 && <HighLighter/>}
        {clickedButton===3 && <Generate/>}
      </div>
  );
}

export default App;
