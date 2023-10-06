# Google Drive File Upload and Download

This Node.js application allows you to upload and download files from Google Drive using the Google Drive API. It provides a web interface to interact with the API.

## Files

1. **index.js**: This is the main server file. It sets up an Express.js server, defines routes, and handles file downloads and uploads to Google Drive.

2. **router.js**: This file defines an Express.js router for handling file upload and download operations. It uses the Google Drive API for these tasks.

3. **index.html**: This HTML file contains the web interface for uploading and downloading files from Google Drive. Users can enter their name, email address, and Google Drive file ID to initiate the process.

## How to Use

1. Clone this repository to your local machine.
Start the server using nodemon or node index.js
2. Install the required dependencies by running the following command:
   npm install express.js multer googleapis 
3. Access the web interface by opening your web browser and navigating to http://localhost:4000.
4. To test on postman set the URL to http://localhost:4000/downloadAndUpload and request method to POST. 

