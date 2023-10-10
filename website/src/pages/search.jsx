import React, { useState } from 'react';
import Pulse from './Pulse';

const Search = () => {
  const [showImages, setShowImages] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [buttontext, setButtonText] = useState('Generate');
  const [generatedText, setGeneratedText] = useState('');
  const [document, setDocumentLink] = useState('');
  const [response,setResponse] = useState(false)

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerateClick();
    }
  };

  async function handleGenerateClick(){
    setResponse(false)
    get_auth()
    if (buttontext === 'Generate' && inputValue.trim() === '') {
      alert('Please enter text before generating the iframe.');
      return; // Don't proceed if input is empty for the first generation
    }
  
    if (buttontext === 'Generate') {
      setButtonText('Generate New');
      setGeneratedText(inputValue);
      setShowImages(!showImages);
      setInputValue(''); // Clear the input field for the first generation
    } else {
      setButtonText('Generate');
      setGeneratedText('');
      setShowImages(false); // Hide the content when generating new
    }
  };

  async function handleGenerate(){
    setResponse(false)
    if (buttontext === 'Generate' && inputValue.trim() === '') {
      alert('Please enter text before generating the iframe.');
      return;
    }

    setButtonText('Generate');
    setGeneratedText('');
    setShowImages(false);

  };

  async function sendMail(){

  }

  async function sendprompt() {
      const requestBody = {data:inputValue}
      // console.log("Req body is",requestBody);
      await fetch('https://dropbox-4zxc4m7upa-el.a.run.app/generate', {
          method: 'POST', // Change the request method to POST
          headers: {
              "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify(requestBody), // Convert the request body to JSON format
      }).then((response) => {
          return response.json();
      }).then(data => {
          setDocumentLink(data);
          setResponse(true)
          console.log(data);
      });

}

function get_auth() {
  // console.log("Req body is",requestBody);
  fetch('https://dropbox-4zxc4m7upa-el.a.run.app/auth', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
  })
  
  .then((response) => {
    console.log("lol",response);
    return response.json();
})

.then(data => {
    const openwindow = window.open(data, '_blank');
    console.log(data);

    // Define a function to check if the window is closed
    const checkWindowClosed = () => {
        if (openwindow.closed) {
            clearInterval(checkInterval); // Stop checking
            sendprompt(); // Execute the sendprompt function
        }
    };

    // Check every 500 milliseconds if the window is closed
    const checkInterval = setInterval(checkWindowClosed, 500);
});

}
  
  return (
    <div className="flex flex-col items-center h-auto mt-[70px]">

    <div className='w-full flex flex-col items-center'>
      <p className="bio text-[30px] mb-[10px]">
        "Your Ideas, Our Documents – Seamlessly Crafted."
      </p>
    </div>

    {!showImages && (
      <div className={`relative flex transition-transform ease-in-out duration-500 pb-[10px]`}>
        <input
          type="search"
          id="default-search"
          className="flex-grow w-[700px] p-2 bg-transparent text-sm border ring-none focus:ring-none rounded-lg border-[var(--primary-light)] placeholder-gray-400 text-white focus:border-[var(--text-secondary)]"
          placeholder={generatedText ? '' : 'Your Prompt'}
          value={inputValue}
          onKeyUp={handleKeyPress}
          onChange={handleInputChange}
        />
        <button className="text-sm text-[var(--primary)] bg-[var(--text)] whitespace-nowrap" onClick={handleGenerateClick}>
          {buttontext}
        </button>
      </div>
    )}

    
    {showImages && (
      <div className="mt-[5px] h-auto w-full"style={{ backgroundColor: '#18181b' }}>
        {!response && (<div className='flex flex-col items-center'><Pulse /></div>)}
        {response && (<div className='flex flex-col items-center mb-[4vh]'>
          <iframe
            src={document}
            title='Document'
            width="800vw"
            height="1000vh"
            frameBorder="10px"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>)}

        <div className="flex flex-col items-center">
          <div className={`relative flex transition-transform ease-in-out duration-500 pb-[10px]`}>
            <input
              type="search"
              id="default-search"
              className="flex-grow w-[40vh] p-2 bg-transparent text-sm border rounded-lg border-grey-600 placeholder-gray-400 text-white focus:border-[var(--text-secondary)]"
              placeholder={generatedText ? '' : 'Your Prompt'}
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="text-md ml-[1vw] text-[var(--primary)] bg-[var(--text)] " onClick={sendMail}>
              Send Mail
            </button>

            <button className="text-md mx-[1vw] text-[var(--primary)] bg-[var(--text)]" onClick={handleGenerate}>
              {buttontext}
            </button>

          </div>
        </div>
      </div>
    )}

    </div>
  );
};

export default Search;
