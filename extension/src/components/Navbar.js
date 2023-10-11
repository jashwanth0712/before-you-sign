/* global chrome */
import React, { useEffect, useState } from "react";
import chatbot from '../chatbot.gif';
import generator from '../generator.gif';
import highlight from '../highlight.gif';


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
      <nav className="bg-gradient-to-r from-blue-300 to-[#A796FD] w-full">
        <div className="navbar flex items-center justify-center" style={{height:'6rem'}}>
          <button onClick={() => onButtonClick(1)} className="flex flex-col items-center mr-10 font-grotesk font-medium text-small hover:h-15 hover:width-15">
            <img src={chatbot} alt="chatbot" className="rounded-lg h-10 w-10"/>
            <p className="mt-1 text-white">AI Lawyer</p>
          </button>
          <button onClick={() => onButtonClick(2)} className="flex flex-col items-center ml-10 mr-10 font-grotesk font-medium text-small">
            <img src={highlight} alt="highlight" className="rounded-lg h-10 w-10"/>
            <p className="mt-1 text-white">HighLight</p>
          </button>
          <button onClick={() => {window.open("https://before-you-sign-it.vercel.app/search", "_blank");}} className="flex flex-col items-center ml-10 font-grotesk font-medium text-small">
            <img src={generator} alt="generate" className="rounded-lg h-10 w-10"/>
            <p className="mt-1 text-white">Generate</p>
          </button>
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