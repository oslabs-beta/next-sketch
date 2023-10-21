const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;


const fileController = {
  // Recursive function to get files
  // postFiles: function (req, res, next) {
  //   console.log("hello");
  //   const dir = "src/components/left/NextBoiler/nextsketch";
  //   function recall(dir, files = []) {
  //     console.log("in recall");

  //     // Get an array of all files and directories in the passed directory using fs.readdirSync
  //     const fileList = fs.readdirSync(dir);
  //     console.log('filelist', fileList)
  //     // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  //     for (const file of fileList) {
  //       const name = `${dir}/${file}`;

  //       if (file === "node_modules") {
  //         files.push([`${dir}/${file}`]);
  //         continue;
  //       }

  //       // Check if the current file/directory is a directory using fs.statSync
  //       if (fs.statSync(name).isDirectory()) {
  //         // If it is a directory, recursively call the getFiles function with the directory path and the files array
  //         files.push([name])

  //         recall(name, files);

  //       } else {
  //         // If it is a file, push the full path to the files array
  //         files.push(name);
  //       }

  //       if (name === `${dir}/${fileList[fileList.length - 1]}`) {
  //         // console.log("in basecase");
  //         console.log("files", files);

  //         res.locals.files = files;
  //         return;
  //       }

  //     }
  //     return files;
  //   }
  //   recall(dir);
  //   return next();
  // },

  postFolder: function (req, res, next) {
    console.log('inside postFolder');
    if (req.body.name) {
      const dir = 'server/ExportFolder/nextsketch/src/app/';
      fs.mkdirSync(path.join(dir, req.body.name));
      return next();
    }

    if (req.body.fileName) {
      const fileDir =
        'server/ExportFolder/nextsketch/src/app/' + req.body.folderName;
      fs.writeFileSync(path.join(fileDir, req.body.fileName), '');

      return next();
    }
  },

  deleteFolder: function (req, res, next) {
    const folderDir = 'server/ExportFolder/nextsketch';

    //helper function to recursively get deeper into nested folders and files
    function recall(folderDir) {
      // Get an array of all files and directories in the passed directory using fs.readdirSync
      const fileList = fs.readdirSync(folderDir);

      // Create the full path of the file/directory by concatenating the passed directory and file/directory name
      for (const file of fileList) {
        const name = `${folderDir}/${file}`;

        //skip reading over all the files inside node_modules for efficiency
        if (file === 'node_modules') {
          //but if we click to delete it, delete it
          fs.rmSync(name, { recursive: true });
          continue;
        }

        //if the file is the same name as the one we clicked delete on, remove it from the directory
        if (file === req.body.name) {
          //condition to check if what we want to delete is either a folder or a file
          if (fs.lstatSync(name).isDirectory())
            fs.rmSync(name, { recursive: true });
          else fs.rmSync(name);
          return;
        }

        // Check if the current file/directory is a directory using fs.statSync
        if (fs.statSync(name).isDirectory()) {
          // If it is a directory, recursively call the getFiles function with the directory path and the files array

          recall(name);
        }
      }
      return;
    }
    recall(folderDir);
    return next();
  },

  updateCode: function (req, res, next) {
    const fileDir =
      'server/ExportFolder/nextsketch/src/app/' + req.body.folderName;
    fs.writeFileSync(path.join(fileDir, req.body.fileName), req.body.code);
    return next();
  },

  deleteExport: function (req, res, next) {
    const folderDir = 'server/ExportFolder/nextsketch';
    fs.rmSync(folderDir, { recursive: true });
    // const output = execSync('npx create-next-app my-nextjs-app', { encoding: 'utf-8' });  // the default is 'buffer'
    // console.log('Output was:\n', output);

    return next();
  },

  createExport: function (req, res, next) {
    const targetDir = 'server/ExportFolder';
    const sourceDir = 'server/nextsketch';

    // process.chdir(dir);
    // const output = execSync('npx create-next-app nextsketch --example with-typescript', { encoding: 'utf-8' });  // the default is 'buffer'
    // fs.copySync(sourceDir, path.join(targetDir, 'nextsketch'), {
    //   filter: (src, dest) => {
    //     // Include all files and directories.
    //     return true;
    //   }
    // });


    fs.copy(sourceDir, path.join(targetDir, 'nextsketch'), { recursive: true }, (err) => {
      if (err) {
        console.error(`Error copying directory: ${err}`);
      } else {
        console.log('Directory and its contents copied successfully.');

      }
    );


    return next();
  },
};

module.exports = fileController;
