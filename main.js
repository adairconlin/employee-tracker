const db = require("./db/connection");
const inquirer = require("inquirer");
const { writeFile, copyFile } = require("./utils/generate-sql");
const generateFile = require("./utils/file-template");

//Sql server connection response
db.connect(err => {
    if(err) throw err;
    console.log("Database connected.");
});

