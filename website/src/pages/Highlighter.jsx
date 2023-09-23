import React from 'react';
import { useParams } from 'react-router-dom';
import HelloSign from 'hellosign-embedded';
import env from "react-dotenv";
const client = new HelloSign({
  clientId: env.CLIENTID
});
client.open('https://app.hellosign.com/sign/d48313d9c9b86f4cdd8189947f7b8dd9306c13ef', {
    testMode: true
  });
  
  client.on('sign', () => {
    alert('The document has been signed!');
  });
export default function Highlighter() {
    const { id } = useParams();
    

    // URL of the iframe
    const iframeSrc = 'https://app.hellosign.com/sign/d48313d9c9b86f4cdd8189947f7b8dd9306c13ef';

    return (
        <div>
            <h1 className="font-grotesk text-[30px] font-medium text-center text-text-primary mt-20">Route Parameter (id): {id}</h1>
            
            {/* Include the iframe with the specified URL */}
            <iframe
                src={iframeSrc}
                width="100%"   // You can adjust these dimensions as needed
                height="500px" // You can adjust these dimensions as needed
                frameBorder="0"
                title="HelloSign"
            ></iframe>
        </div>
    );
}
