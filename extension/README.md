# React Chrome Extension Quick Starter
This guide helps you quickly set up a Chrome extension using React and Create React App. It assumes basic knowledge of React and Chrome extensions.

## Getting Started
Follow these steps to clone the project and run the Chrome extension locally:

Clone the Repository:
```
cd extension
```
## Install Dependencies:
```
npm install
```
Create Environment Variable:

Create a .env file in the root directory and add this line:
```
INLINE_RUNTIME_CHUNK=false
```
Build the Extension:

Run:
```
npm run build
```
Load the Extension in Chrome:

Open Chrome and go to chrome://extensions/
Turn on "Developer mode" (top-right corner)
Click "Load unpacked" and select the build folder
Test the Extension:

Your extension icon should appear in the Chrome toolbar. Click it to activate.

Manifest File
Customize the public/manifest.json file for extension details like name, icons, permissions, and behavior.