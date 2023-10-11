/* global chrome */
import React, { useEffect, useState } from "react";
import background from '../iconlawyer.png';

function Navbar({ onButtonClick }) {
  const [isCorrectUrl, setIsCorrectUrl] = useState(false);

  async function getCurrentTab() {
    let queryOptions = { active: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab.url)
    return tab;
  }

  async function checkingTab() {
  const CurrentTab = await getCurrentTab();
  
  if(CurrentTab.url.includes('https://www.hellosign.com/')){
    console.log(CurrentTab.url+"1");
      return 1;
  }else{
    console.log(CurrentTab.url);
    return 0;
  }}

  useEffect(() => {
    async function fetchData() {
      const isCorrect = await checkingTab();
      setIsCorrectUrl(isCorrect);
    }

    fetchData();
  }, []); 

  if (true || isCorrectUrl){
    return (
      <nav className="bg-gradient-to-r from-blue-300 to-purple-400 w-full">
        <div className="navbar flex items-center justify-center" style={{height:'6rem'}}>
          <button onClick={() => onButtonClick(1)} className="fle flex-col items-center bg-white mr-3 pl-2 pr-2 font-grotesk font-medium text-base text-black p-1">
            <img src={background} alt="lawyer" className="h-5 w-5"/> Ai Lawyer
          </button>
          <button onClick={() => onButtonClick(2)} className="bg-white mr-3 pl-2 pr-2 font-grotesk font-medium text-base text-black p-1">Highlighter</button>
          <button onClick={() => {window.open("https://before-you-sign-it.vercel.app/search", "_blank");}} className="bg-white mr-3 pl-2 pr-2 font-grotesk font-medium text-base text-black p-1">Generate</button>
     </div>
      </nav>
    );
  }else{
    return(
      <div className="bg-white">Incorrect Url</div>
    )
  }
}

export default Navbar;