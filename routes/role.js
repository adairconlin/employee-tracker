const db = require("../db/connection");

//Get all roles
getRoles = () => {
    const sql = `SELECT role.title, role.id, role.salary, department.name AS department
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id`
    db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length === 0) {
            console.log("There are no current roles.");
        } else {
            console.table(result);
        }
        process.exit();
    });
};

//Add a role to database
addRole = (title, salary, department_id) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params  = [title, salary, department_id];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.log("Role has been added!");
        process.exit();
    });
};

//Delete a role from database
deleteRole = (title) => {
    const sql = `DELETE FROM role WHERE title = ?`;
    db.query(sql, title, (err, result) => {
        if(err) throw err;
        console.log("Role has been deleted!");
        process.exit();
    })
}

module.exports = { getRoles, addRole, deleteRole };