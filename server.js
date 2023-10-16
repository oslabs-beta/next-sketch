const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const cors = require("cors");
const PORT = 3000;
app.use(cors()); const fileController = require("./fileController.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", fileController.postFiles, (req, res) => {
    return res.status(200).json(res.locals.files);
});


app.use((err, req, res, next) => {
    const defaultErr = {
        log: "Express error handler caught unknown middleware error",
        status: 500,
        message: { err: "An error occurred" },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
