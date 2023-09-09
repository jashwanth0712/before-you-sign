/* global chrome */
import React from 'react';

var data = "";

function Click(){
    console.log("Button clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: () => {
            console.log("Message sent to the content script");
            console.log(document);
            //console.log(document.getElementById('root'));
            let iframe = document.getElementsByClassName('iframe')[0];
            let imagerequired = iframe.contentWindow.document.getElementsByTagName('img')[0];
            var canvas = document.createElement("canvas");
            canvas.width = imagerequired.width;
            canvas.height = imagerequired.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(imagerequired, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            //console.log(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
            data = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            //window.localStorage.setItem("base64img", data);
            const response = chrome.runtime.sendMessage({ action: "printDOM", document: data });
            console.log(response);
            // base 64 image
            //console.log(data);
            localStorage.setItem("base64img", data);
        }
        }); 
    });
}

export function Button() {
    //const base64Image = 'data:image/png;base64,' + localStorage.getItem("base64img");
    // const base64Image = 'data:image/png;base64,' + data;
    return ( 
        <>
            <button id="newTabButton" onClick={() => Click()}>Click me</button>
        </>
     );
}

export default Button;

