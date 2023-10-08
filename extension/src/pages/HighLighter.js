import React, { useState, useEffect } from 'react';
import Button from "../Button";
import Pulse from './Pulse';

function getText(){
  //let response = localStorage.getItem('response');
  let response = JSON.parse(localStorage.getItem('response'));
  let highlightedText = response[0], fullText = response[1];
  //console.log(highlightedText);
  //console.log(fullText);
  const regex = new RegExp(highlightedText.join("|"), "gi");
  let highlightedParagraph = fullText.replace(regex, `<mark class="bg-yellow-500 text-white font-bold">$&</mark>`);
  // Replace all newline and tab characters with <br> tags.
  highlightedParagraph = highlightedParagraph.replace(/[\n\t]+/g, "<br>");
  return highlightedParagraph;
}

function HighLighter() {
  const [text, setText] = useState("");
  // call setText with the response from the server in regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setText(getText());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col h-screen items-center">
      <Button />
      <Pulse />
      <section className= "text-white" dangerouslySetInnerHTML={{ __html: text }}>
      </section>
    </div>
  );
}

export default HighLighter;
