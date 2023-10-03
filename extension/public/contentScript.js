chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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

}
