<h1 align="center"   style="border-bottom: none">
    <b>
        <a href="https://before-you-sign-it.vercel.app/">Before you sign✋</a><br>
</h1>

![Homepage Screenshot](https://github.com/jashwanth0712/before-you-sign/raw/main/website/src/assets/images/homepage.png)
### Before you sign is an AI tool that helps you assist with the `legal issues` , `creation` and `guidance` in handling documents with ease🤩

# Problem statement
- Users are `lazy` to read entire document , hence they tend to skip important information
- huge rules and terms in documentations are `offen skipped`
- Its difficult for individuals to keep up with all the rules and `regulations`

# Solution

Before you sign is an AI-based chrome extension that can help you with legal issues, creation, and guidance in handling documents with ease 📄. It can help you to:

- **Identify important information in legal documents:** \
Before you sign can highlight essential information in legal documents, making it easy to read and understand them 🔍.
- **Get legal advice from experts:** \
Before you sign can provide you with legal advice from expert AI, so you can make informed decisions about whether or not to sign a legal document 💡.
- **Generate legal documents with ease:** \
Before you sign can help you to generate legal documents, such as wills, contracts, and power of attorney documents, with ease 📝.

# Benefits of using Before you sign

- **Save time and money:** \
Before you sign can help you to save time and money by automating the process of reading and understanding legal documents 💵.
- **Reduce the risk of legal problems:** \
By understanding the terms and conditions of a legal document before you sign it, you can reduce the risk of legal problems in the future ⚖️.
- **Make informed decisions:** \
Before you sign can help you to make informed decisions about whether or not to sign a legal document 🧠.
- **Protect yourself and your loved ones:** \
Before you sign can help you to protect yourself and your loved ones from legal problems 🙏.


# How Before you sign works

![Workflow Diagram](https://github.com/jashwanth0712/before-you-sign/blob/main/website/src/assets/images/chart.png)

## Lawyer Chatbot 👩‍⚖️

The Lawyer Chatbot within our extension offers expert legal assistance for your documents. Here's how it works:

1. **User Interaction**:
   - Users can ask legal questions or seek advice regarding their documents.

2. **Natural Language Processing**:
   - The chatbot utilizes NLP algorithms to understand user queries.

3. **Legal Expertise**:
   - It provides responses based on a database of legal knowledge using the OPENAI API.

## Text Highlighter 🖍️

Our Text Highlighter feature enhances document readability by identifying and highlighting important text. Here's the workflow:

1. **Image Upload**:
   - Users upload document images within the extension.

2. **Server Processing**:
   - Images are sent to a server for processing.

3. **OCR and AI Analysis**:
   - Tesseract OCR engine extracts text from images.

   - OpenAI API, trained on action words and legal actions, identifies crucial text.

4. **Extension Display**:
   - The highlighted text is displayed within the extension, guiding users to critical information.

## Document Generator 📄✉️

Generate legal documents effortlessly and request signatures using Dropbox Sign API. Here's how it functions:

1. **Prompt-Based Document Generation**:
   - Users provide prompts to create customized legal documents.

2. **Google Docs Integration**:
   - The extension interfaces with Google Docs and Google Drive API to generate the legal documents based on user prompts.

3. **Recipient Notifications**:
   - Documents are sent to the recipients' Dropbox inboxes using Dropbox API.

4. **Signature Requests**:
   - Recipients are asked to sign documents using Dropbox Sign API.

## How to Install and Use Before You Sign Chrome Extension 📝📤🤖

**1. Download/Clone the repository:**

- Click the "Code" button, and select "Download ZIP" to save the repository to your computer.

- Alternatively, you can clone the repository using the following command:
   ```bash
   git clone https://github.com/jashwanth0712/before-you-sign.git
     ```

**2. Install Required Modules:**

- Open a terminal/command prompt and navigate to the extension folder inside the repository's directory.

- Run the following command to install the required modules:
   ```
   npm install
   ```
- Run the following command to build the extension:
   ```
   npm run build
   ```
- This will create a `build` folder within the extension folder.

**3. Unpack the Extension:**

- After the installation is complete, you need to unpack the extension into your Chrome browser.

- Open Google Chrome and type `chrome://extensions/` into the address bar.

- Toggle on the "Developer mode" located at the top-right corner of the page.

- Click the "Load unpacked" button.

- Browse to the `build` folder within the downloaded repository and select it.

**4. Enable the Extension:**

- Once you've loaded the extension, it should appear in your Chrome extensions list.

- Make sure the extension is enabled by toggling the switch next to it.

**5. Start Using the Extension:**

- The Document Signer Extension icon should now be visible in your Chrome toolbar.

- Click on the extension icon to open and start using its features, including the Legal Chatbot, Text Highlighter, and Document Generator.

**Note: If you prefer an alternative download method, you can download the `build` folder directly by downloading from [this link](https://drive.google.com/drive/folders/1eFvtfvu24le5Y3rStvWwkr4U9YgWvSIq?usp=sharing).**

## Tech Stack 🛠️

- **Frontend**:
  - Developed using React for a user-friendly interface.

  - Styled with Tailwind CSS for a clean and responsive design.

- **Backend**:
  - Powered by FastAPI for efficient API handling.

  - Deployed on Google Cloud Platform (GCP) for scalability and reliability.

- **Containerization**:
  - Docker is used for containerization, ensuring consistent deployment across environments.

Now that you understand its use, what are you waiting for? Use it now and experience the convenience of efficient document management and legal assistance right at your fingertips! 🚀
