const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
app.use(cors());
const fileController = require('./fileController.js');
const archiver = require('archiver');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/export', (req, res) => {
  const folderPath = 'server/ExportFolder/NextSketch'; // Replace with the actual folder path
  const output = fs.createWriteStream('exported_folder.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Maximum compression
  });

  archive.pipe(output);

  // Recursively add all files and folders within the specified folder
  function addFolderToZip(folderPath, folderName) {
    const folderContents = fs.readdirSync(folderPath);
    folderContents.forEach((item) => {
      const itemPath = path.join(folderPath, item);
      const itemStat = fs.statSync(itemPath);
      if (itemStat.isDirectory()) {
        addFolderToZip(itemPath, path.join(folderName, item));
      } else {
        archive.file(itemPath, { name: path.join(folderName, item) });
      }
    });
  }

  addFolderToZip(folderPath, '');

  archive.finalize();
  output.on('close', () => {
    res.download('exported_folder.zip');
  });
});

app.get(
  '/',
  fileController.deleteExport,
  fileController.createExport,
  (req, res) => {
    return res.status(200);
  }
);

app.put('/updatecode', fileController.updateCode, (req, res) => {
  res.status(200).send();
});

app.post('/', fileController.postFolder, (req, res) => {
  return res.status(200).json(res.locals.fileProps);
});

app.delete('/', fileController.deleteFolder, (req, res) => {
  return res.status(200).send();
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
