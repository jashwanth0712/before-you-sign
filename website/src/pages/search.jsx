import React, { useState } from 'react';

const Search = () => {
  const [showImages, setShowImages] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [buttontext, setButtonText] = useState('Generate');
  const [generatedText, setGeneratedText] = useState('');
  const [document, setDocumentLink] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  async function handleGenerateClick(){
    await get_auth()
    const data = await sendprompt()
    console.log(data)
    if (buttontext === 'Generate' && inputValue.trim() === '') {
      alert('Please enter text before generating the iframe.');
      return; // Don't proceed if input is empty for the first generation
    }
  
    if (buttontext === 'Generate') {
      setButtonText('Generate new');
      setGeneratedText(inputValue);
      setShowImages(!showImages);
      setInputValue(''); // Clear the input field for the first generation
    } else {
      setButtonText('Generate');
      setGeneratedText('');
      setShowImages(false); // Hide the content when generating new
    }
  };

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
          console.log(data);
      });

}

async function get_auth() {
  // console.log("Req body is",requestBody);
  await fetch('https://dropbox-4zxc4m7upa-el.a.run.app/auth', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
  }).then((response) => {
    return response.json();
}).then(data => {
  const openwindow = window.open(data, '_blank');
    console.log(data);
});
}
  

  return (
    <div className="flex flex-col items-center h-screen mt-[70px]">

    <div className='w-full flex flex-col items-center'><p className="bio text-[30px] mb-[10px]">
        "Your Ideas, Our Documents – Seamlessly Crafted."
      </p></div>
     

      <div
        className={`relative flex transition-transform ease-in-out duration-500 pb-[10px] mt-[15px]`}
        style={{
          transform: showImages ? 'translateY(calc(130vh - 170px))' : 'none',
        }}
      >
        <input
          type="search"
          id="default-search"
          className="flex-grow w-[700px] p-2 bg-transparent text-sm border ring-none focus:ring-none rounded-lg border-[var(--primary-light)] placeholder-gray-400 text-white focus:border-[var(--text-secondary)]"
          placeholder={generatedText ? '' : 'Your Prompt'}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="text-sm text-[var(--primary)] bg-[var(--text)] whitespace-nowrap"
          onClick={handleGenerateClick}
        >
          {buttontext}
        </button>
      </div>
     
{showImages && (
  <div className="mt-[5px] w-full"style={{ backgroundColor: '#18181b' }}>
    <div className='bg-grey'>  {generatedText && (
      <div className="mt-[10px] mb-[15px] ml-[30%] text-left">
        <p>Your Prompt:</p> {/* Add text-left class here */}
        {generatedText}
      </div>
    )} </div>

    <div className='flex flex-col items-center'>
      <iframe
        src={document}
        title='Document'
        width="800"
        height="800"
        frameBorder="10px"
        marginHeight="0"
        marginWidth="0"
      ></iframe>
    </div>
    <div className='text-right mr-[27%]' > <button className="text-sm text-white bg-transparent border-white mb-[5px]">
      Re-Generate
    </button></div>
    
  </div>
)}

    </div>
  );
};

export default Search;
