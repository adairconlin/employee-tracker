const db = require("../db/connection");

//Get all departments
getDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("All Departments:")
        console.log(result);
        console.table(result);
    });
};

//Add a deparment to database
addDepartment = (name) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params  = [name];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.log("Department has been added!");
    });
};

//Delete a department from database
deleteDepartment = (id) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    db.query(sql, id, (err, result) => {
        if(err) throw err;
        console.log("Department has been deleted!");
    })
}

module.exports = { getDepartments, addDepartment, deleteDepartment };