const stream = require('stream');
const express = require('express');
const multer = require('multer');
const path = require('path');
const { google } = require('googleapis');

const uploadRouter = express.Router();
const upload = multer();

const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const downloadAndUpload = async (req, res) => {
    try {
        // const downloadFileId = "1SJIpI9q_HqgpFQQor20C_p3ksJhR8_M5"; // Replace with the correct file ID
        const downloadFileId = req.body.downloadFileId; // File ID to download from Google Drive
        const drive = google.drive({ version: 'v3', auth });
        const downloadResponse = await drive.files.get({
            fileId: downloadFileId,
            alt: 'media', 
        }, { responseType: 'stream' });
        const downloadedFileName = downloadResponse.data.name || 'Video';
        console.log(`Downloaded video file: ${downloadedFileName}`);
        const bufferStream = new stream.PassThrough();
        downloadResponse.data.pipe(bufferStream);
        const uploadResponse = await google.drive({ version: 'v3', auth }).files.create({
            media: {
                mimeType: downloadResponse.headers['content-type'],
                body: bufferStream,
            },
            requestBody: {
                name: downloadResponse.data.name,
                parents: ['1RmMnIuCDM4Gi_JiXIR8F7APK2u2R9LP2'],
            },
            fields: "id,name",
        });
        const uploadedFileName = uploadResponse.data.name || 'Video';
        console.log(`Uploaded video file: ${uploadedFileName} (ID: ${uploadResponse.data.id})`);
        res.status(200).send("Download and Upload Completed");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error downloading and uploading file");
    }
};

uploadRouter.post("/downloadAndUpload", upload.single('file_to_upload'), downloadAndUpload);

module.exports = uploadRouter;

