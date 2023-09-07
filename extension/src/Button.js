/* global chrome*/
import React from 'react';

function Click(){
    console.log("Button clicked");
    // // print all the dom elements
    // console.log(document);
    // // print all the dom elements within the web page
    // console.log(document.documentElement.innerHTML);

    // chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    //     const activeTab = tabs[0];
    //     chrome.scripting.executeScript(
    //       {
    //         target: { tabId: activeTab.id },
    //         function: () => {
    //           const allElements = document.querySelectorAll('*');
    //           allElements.forEach(element => {
    //             console.log(element);
    //           });
    //         }
    //       }
    //     );
    //   });
    // Send a message to the content script to trigger printing DOM
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: () => {
            console.log("Message sent to the content script");
            console.log(document);
            const response = chrome.runtime.sendMessage({ action: "printDOM", document: document.documentElement.innerHTML });
            console.log(response);
        }
        });
        //chrome.tabs.sendMessage(activeTab.id, { action: "printDOM" });
        //chrome.tabs.executeScript(activeTab.id, { code: `chrome.runtime.sendMessage({ action: "printDOM" });` });
    });
    
}

export function Button() {
    return ( 
        <button onClick={() => Click()}>Click me</button>
     );
}

export default Button;