/* global chrome */

function printDOM() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      console.log(element);
    });
  }
  
  // Listen for a message from the extension popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received from the extension popup button");
    console.log(request);
    if (request.action === "printDOM") {
      //printDOM();
    }
    sendResponse({msg: "Message received"});
  });