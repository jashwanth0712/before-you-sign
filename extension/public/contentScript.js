/* global chrome */
var tabId;

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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received");
  if (message.type === "TABUPDATED") {
    // Your code to run when the tab is updated goes here
    console.log("Content script received a TABUPDATED message");

    // You can insert code here to inject a button into the body, for example
    injectButton();
  }
});

function injectButton() {
  // Create a button element
  // Create a new button element
  console.log("Inside injectButton");
  var button = document.createElement("button");

  // Set the button's text
  button.textContent = "Click Me";

  // Apply CSS styles to the button
  button.style.position = "absolute";
  button.style.top = "0";
  button.style.left = "50%";

  // Add an event listener to the button
  button.addEventListener("click", function() {
    alert("Button Clicked!");
  });

  // Append the button to the body
  document.body.appendChild(button);

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if(type === "TABUPDATED") {
      pageLoaded()
    }
  });
};

  
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

const API_ENDPOINT = "https://dropbox-4zxc4m7upa-el.a.run.app/action"

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
            // store the response in local storage
            localStorage.setItem("response", JSON.stringify(responseData));
        })
        .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
    });
}

