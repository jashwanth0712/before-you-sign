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
