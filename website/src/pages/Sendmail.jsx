import React, { useState } from "react";

export default function Sendmail() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameAlert, setNameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name_list = name.split(" ");
    const email_list = email.split(" ");

    const names = name_list.filter((item) => item.trim() !== "");
    const emails = email_list.filter((item) => item.trim() !== "");

    if (names.length < emails.length) {
      window.alert("Enter all Names");
      setNameAlert(true);
    } else {
      setNameAlert(false);
    }

    if (names.length > emails.length) {
      window.alert("Enter all Emails");
      setEmailAlert(true);
    } else {
      setEmailAlert(false);
    }

    if (names.length == emails.length)
    {
        sendRequest();
    }

  };

  async function sendRequest() {
    try {
        const res = await fetch(
            'https://dropbox-4zxc4m7upa-el.a.run.app/dropbox_sign?doc_url=https://docs.google.com/document/d/1KYYg-uhgAa0PAiYwFvq3IQ0NINvxwxNEZvzGyQUTY_o/edit?usp=sharing',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                
            }
        ).then(
            console.log("sent request")
        )
    } 
    catch (error) {
        console.log("sendRequest went wrong ",error)
    }
  }

  return (
    <div className="w-full max-w-3xl mt-[15vh] mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-blue-300 to-purple-500 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              nameAlert ? "border-2 border-red-500" : ""
            }`}
            id="name"
            type="text"
            placeholder="Give space between names for multiple inputs (Eg : Johnn Smith)"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameAlert(false);
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              emailAlert ? "border-2 border-red-500" : ""
            }`}
            placeholder="Give space between emails for mulltiple inputs(Eg : john@mail.com smith@mail.com)"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailAlert(false); 
            }}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-white hover:bg-purple-800 hover:text-white text-black text-[17px] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
