/* global chrome */
import React from 'react';

var data = "";



export function Button_(props) {
    //const base64Image = 'data:image/png;base64,' + localStorage.getItem("base64img");
    // const base64Image = 'data:image/png;base64,' + data;
    function Click(){
        console.log("Button clicked");
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: () => {
                console.log("Message sent to the content script");
                //console.log(document.getElementById('root'));
                console.log(document)
                // let iframe = document.getElementsByClassName('iframe')[0];
                // let imagerequired = iframe.contentWindow.document.getElementsByTagName('img')[0];
                //console.log(imagerequired);
                let images = document.getElementsByTagName('img');
                // filter the images and get images which don't have the word logo in their classNames
                let filteredImages = Array.from(images).filter(image => !image.className.includes('logo'));
                let imagerequired = filteredImages[0];
                console.log(imagerequired)
                imagerequired.setAttribute('crossorigin', 'anonymous');
                //console.log(imagerequired);
                var canvas = document.createElement("canvas");
                canvas.width = imagerequired.width;
                canvas.height = imagerequired.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(imagerequired, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                //console.log(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
                data = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
                console.log(data)

                //console.log(data);
                //window.localStorage.setItem("base64img", data);
                const response = chrome.runtime.sendMessage({ action: "printDOM", document: data });
                console.log(response);
                // base 64 image
                //console.log(data);
            }
            }); 
        });
    }
    return ( 
        <>
            <button id="newTabButton" onClick={() => Click()} class="bg-white p-4 rounded-lg">Click me</button>
            
      {data ? (
        <img src={data} alt="Received Image" />
      ) : (
        <p>Waiting for the image...</p>
      )}
    
         </>
     );
}

export default Button_;

