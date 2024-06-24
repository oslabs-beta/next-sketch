const fs = require('fs-extra');
const path = require('path');
const { emitWarning } = require('process');
const execSync = require('child_process').execSync;
const ncp = require('ncp').ncp;
const glob = require('glob');
const archiver = require('archiver');
const JSZip = require('jszip');

const fileController = {
  postFolder: function (req, res, next) {
    const folderDir = 'server/ExportFolder/';

    console.log('hello')

    const fileProperties = [
      req.body.folderName,
      req.body.fileName,
      req.body.codeSnippet,
    ];

    res.locals.fileProps = fileProperties;

    if (req.body.name) {
      const dir = 'server/ExportFolder/NextSketch/src/app/';
      fs.mkdirSync(path.join(dir, req.body.name));
      fs.writeFileSync(path.join(dir + req.body.name, 'page.tsx'), '');
      return next();
    }

    if (req.body.fileName) {
      function recall(folderDir) {
        const fileList = fs.readdirSync(folderDir);

        for (const file of fileList) {
          const name = `${folderDir}/${file}`;
          if (file === 'node_modules') {
            continue;
          }
          if (file === req.body.folderName) {
            if (req.body.isFolder) {
              fs.mkdirSync(path.join(name, req.body.fileName));
              fs.writeFileSync(
                path.join(name + '/' + req.body.fileName, 'page.tsx'),
                ''
              );
            } else if (req.body.codeSnippet) {
              fs.writeFileSync(
                path.join(name, req.body.fileName),
                req.body.codeSnippet
              );
            } else {
              fs.writeFileSync(path.join(name, req.body.fileName), '');
            }
            return;
          }
          if (fs.statSync(name).isDirectory()) {
            recall(name);
          }
        }
        return;
      }

      recall(folderDir);
      return next();
    }
  },

  deleteFolder: function (req, res, next) {
    const folderDir = 'server/ExportFolder';

    function recall(folderDir) {
      const fileList = fs.readdirSync(folderDir);

      for (const file of fileList) {
        const name = `${folderDir}/${file}`;
        if (name === 'node_modules') {
          if (req.body.name === 'node_modules') {
            fs.rmSync(name, { recursive: true });
          }
          continue;
        }
        if (file === req.body.name) {
          if (fs.lstatSync(name).isDirectory()) {
            fs.rmSync(name, { recursive: true });
          } else {
            fs.rmSync(name);
          }
          return;
        }
        if (fs.statSync(name).isDirectory()) {
          recall(name);
        }
      }
      return;
    }

    recall(folderDir);
    return next();
  },

  updateCode: function (req, res, next) {
    const folderDir = 'server/ExportFolder';

    function recall(folderDir) {
      const fileList = fs.readdirSync(folderDir);

      for (const file of fileList) {
        const name = `${folderDir}/${file}`;
        if (name === 'node_modules') {
          continue;
        }

        if (file === req.body.folder) {
          fs.writeFileSync(
            path.join(name, req.body.fileName),
            req.body.codeSnippet
          );
        }
        if (fs.statSync(name).isDirectory()) {
          recall(name);
        }
      }
      return;
    }

    recall(folderDir);
    return next();
  },

  deleteExport: function (req, res, next) {
    const folderDir = 'server/ExportFolder/NextSketch';
    fs.rmSync(folderDir, { recursive: true });
    return next();
  },

  createExport: function (req, res, next) {
    const targetDir = 'server/ExportFolder';
    const sourceDir = 'server/NextSketch';

    fs.copy(
      sourceDir,
      path.join(targetDir, 'NextSketch'),
      { recursive: true },
      (err) => {
        if (err) {
          console.error(`Error copying directory: ${err}`);
        } else {
          console.log('Directory and its contents copied successfully.');
        }
      }
    );

    return next();
  },
};

module.exports = fileController;
