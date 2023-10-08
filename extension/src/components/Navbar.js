/* global chrome */
import React, { useEffect, useState } from "react";

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
      <nav className="h-[40px] rounded-lg w-full text-center bg-gradient-to-r from-black via-purple-950 to-black backdop-blur-lg pt-1">
        <div className="navbar">
          <button onClick={() => onButtonClick(1)} className="bg-white mr-3 pl-2 pr-2 font-grotesk rounded-lg font-medium text-base text-black p-1">Ai Lawyer</button>
          <button onClick={() => onButtonClick(2)} className="bg-white mr-3 pl-2 pr-2 font-grotesk rounded-lg font-medium text-base text-black p-1">Highlighter</button>
          <button onClick={() => {window.open("https://before-you-sign-it.vercel.app/search", "_blank");}} className="bg-white mr-3 pl-2 pr-2 font-grotesk rounded-lg font-medium text-base text-black p-1">Generate</button>
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