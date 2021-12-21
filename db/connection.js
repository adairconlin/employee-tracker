const mysql = require("mysql2");

//Connect to mysql database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Xoz3Rbei$&9ciilF",
        database: "employee_tracker"
    },
    console.log("Connected to the employee tracker database.")
);




module.exports = db;