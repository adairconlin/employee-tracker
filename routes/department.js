const db = require("../db/connection");

//Get all departments
getDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
};

//Add a deparment to database
addDepartment = (name) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params  = [name];
    db.query(sql, params, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
};

//Delete a department from database
deleteDepartment = (name) => {

}

module.exports = { getDepartments, addDepartment, deleteDepartment };