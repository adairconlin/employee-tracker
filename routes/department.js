const db = require("../db/connection");

//Get all departments
getDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length === 0) {
            console.log("There are no current departments.");
            process.exit();
        } else {
            console.table(result);
            process.exit();
        }
    });
};

//Add a deparment to database
addDepartment = (name) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params  = [name];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.log("Department has been added!");
        process.exit();
    });
};

//Delete a department from database
deleteDepartment = (id) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    db.query(sql, id, (err, result) => {
        if(err) throw err;
        console.log("Department has been deleted!");
        process.exit();
    })
}

module.exports = { getDepartments, addDepartment, deleteDepartment };