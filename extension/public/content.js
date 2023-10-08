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

const API_ENDPOINT = "https://dropbox-4zxc4m7upa-el.a.run.app/base64"

// to send base64 image to the server
async function sendBase64(data) {
    //let data = localStorage.getItem("base64img");
    console.log("data to be sent: ", data);
    fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({image: data}),
        })
        .then((response) => response.json())
        .then((responseData) => {
            // Handle the response from the server if needed
            console.log('Server response:', responseData);
        })
        .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
    });
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
    // document.getElementsByTagName('button')[0].addEventListener('click', () => {
    //   openReactAppTab(request.document);
    // });
    // send a message to the created tab
    //openReactAppTab(request.document);
    console.log("React app tab opened");
    const res = async() =>{
      await sendBase64(request.document);
    }
    res();
    sendResponse({msg: "Message received"});
  });