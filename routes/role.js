const db = require("../db/connection");

//Get all departments
getRoles = () => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length === 0) {
            console.log("There are no current roles.");
        } else {
            console.table(result);
        }
    });
};

//Add a deparment to database
addRole = (id, title, salary, department_id) => {
    const sql = `INSERT INTO role (id, title, salary, department_id) VALUES (?, ?, ?, ?)`;
    const params  = [id, title, salary, department_id];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.log("Department has been added!");
    });
};

//Delete a department from database
deleteRole = (title) => {
    const sql = `DELETE FROM role WHERE title = ?`;
    db.query(sql, title, (err, result) => {
        if(err) throw err;
        console.log("Department has been deleted!");
    })
}

module.exports = { getRoles, addRole, deleteRole };