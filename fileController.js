const fs = require("fs");

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


    postFiles: function (req, res, next) {
        const data = fs.readFileSync('folderData.json')
        const jsonData = JSON.parse(data);

        res.locals.files = jsonData;
        console.log(res.locals.files)
        return next();
    }



};

module.exports = fileController;