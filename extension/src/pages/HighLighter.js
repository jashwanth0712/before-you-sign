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
  let highlightedParagraph = fullText.replace(regex, `<mark class="bg-purple-500 text-white font-bold" style="padding-right: 3px;  padding-left: 3px;  border-radius: 3px;">$&</mark>`);
  // Replace all newline and tab characters with <br> tags.
  highlightedParagraph = highlightedParagraph.replace(/[\n\t]+/g, "<br>");
  console.log(highlightedParagraph)
  return highlightedParagraph;
}

function HighLighter() {
  const [text, setText] = useState('mou photos<br>clickable links<br>youtbe testimonials<br>justify the content<br>director sir message<br>animation in the<br>width 40%<br>fontsize x-large<br><mark class="bg-yellow-500 text-white font-bold">ECE Co-ordinators:</mark><br><mark class="bg-yellow-500 text-white font-bold">To be updated:</mark><br><mark class="bg-yellow-500 text-white font-bold">Premchand Pavar</mark><br><mark class="bg-yellow-500 text-white font-bold">Praneeth Nayakanti</mark><br><mark class="bg-yellow-500 text-white font-bold">Mech Co-ordinators</mark><br><mark class="bg-yellow-500 text-white font-bold">D Sai Karthikeya</mark><br><mark class="bg-yellow-500 text-white font-bold">Paul Abhishek</mark><br><mark class="bg-yellow-500 text-white font-bold">M Pavan Kalyan</mark><br><mark class="bg-yellow-500 text-white font-bold">A Yashvardhan Sai</mark><br><mark class="bg-yellow-500 text-white font-bold">Naveen Chakravarthi P</mark><br><mark class="bg-yellow-500 text-white font-bold">Sagar Kumar Jha</mark><br><mark class="bg-yellow-500 text-white font-bold">Ragunanthan</mark><br><mark class="bg-yellow-500 text-white font-bold">Design</mark><br><mark class="bg-yellow-500 text-white font-bold">Vignesh</mark><br><mark class="bg-yellow-500 text-white font-bold">Update details of Prathyush - Joint sec</mark><br>');
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
      <section className= "text-white" dangerouslySetInnerHTML={{ __html: text }}></section>
      <section className= "text-black bg-white mx-5 rounded-lg p-5" dangerouslySetInnerHTML={{ __html: text }}>
      </section>
    </div>
  );
}

export default HighLighter;
