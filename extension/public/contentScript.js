(async () => {
  console.log('run content script');
  const pageLoaded = () => {
    const buttonContainerExists = document.getElementsByClassName("square-ext-btn-container")[0];
    console.log("we are in website");
    if (!buttonContainerExists) {
      let ele = document.getElementsByClassName(
        "_action-bar-container_1pjms_5 brws-action-toolbar-actionbar _responsive_1pjms_9"
      );
      
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "square-ext-btn-container";

      const button1 = document.createElement("button");
      button1.textContent = "Open Popup 1";
      button1.className = "square-ext-btn";

      button1.addEventListener('click', () => {
        // Redirect to https://square-ai-hackathon.vercel.app/
        window.location.href = 'https://square-ai-hackathon.vercel.app/';
      });

      const button2 = document.createElement("button");
      button2.textContent = "Open Popup 2";
      button2.className = "square-ext-btn";

      button2.addEventListener('click', () => {
        // Redirect to another URL if needed
        window.location.href = 'https://example.com/';
      });

      // Append buttons to the buttonContainer
      buttonContainer.appendChild(button1);
      buttonContainer.appendChild(button2);

      // Find the squareup.com website's body element and append the buttonContainer
      const body = document.querySelector("body");
      if (body) {
        ele[0].appendChild(buttonContainer);
      }
    }
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if(type === "TABUPDATED") {
      pageLoaded()
    }
  });
})();
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