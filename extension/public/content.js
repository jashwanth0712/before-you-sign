/* global chrome */

var tabId;
  
  async function openReactAppTab(data) {
    const reactAppURL = 'http://localhost:3000/'; 
  
    await chrome.tabs.create({ url: reactAppURL }, function(tab) {
      // The 'tab' variable contains information about the newly created tab,
      // including the tab ID.
      tabId = tab.id;
      console.log('New tab ID:', tabId);
    
      // You can use the tab ID for various purposes, such as updating or interacting with the tab.
    });
    console.log("React app tab opened");
  }

  
  // Listen for a message from the extension popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received from the extension popup button");
    console.log(request);
    //console.log(getTextFromImage(request.document));
    if (request.action === "printDOM") {
      //printDOM();
    }
    console.log(document.getElementsByTagName('button')[0]);
    document.getElementsByTagName('button')[0].addEventListener('click', () => {
      openReactAppTab(request.document);
    });
    // send a message to the created tab
    openReactAppTab(request.document);
    console.log("React app tab opened");
  
    sendResponse({msg: "Message received"});
  });