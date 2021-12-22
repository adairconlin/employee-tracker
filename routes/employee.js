const db = require("../db/connection");

//Get all roles
getEmployees = () => {
    //Referenced code here https://www.sqlservertutorial.net/sql-server-basics/sql-server-self-join/
    const sql = `SELECT e.id, e.first_name, e.last_name,
                 role.title AS current_role, 
                 m.first_name AS manager_name 
                 FROM employee e
                 LEFT JOIN role ON e.role_id = role.id
                 LEFT JOIN employee m ON m.id = e.manager_id`
    db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length === 0) {
            console.log("There are no current employees.");
        } else {
            console.table(result);
        }
        process.exit();
    });
};

//Add a role to database
addEmployee = (first_name, last_name, role_id, manager_id) => {
    if(!manager_id) {
        manager_id = null;
    }
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params  = [first_name, last_name, role_id, manager_id];
    db.query(sql, params, (err, rows) => {
        if(err) throw err;
        console.log("Employee has been added!");
        process.exit();
    });
};

//Update an employee
updateEmployee = (id, choice, change) => {
    const sql = `UPDATE employee SET ${choice} = ? WHERE id = ?`;
    const params = [change, id];
    db.query(sql, params, (err, result) => {
        if(err) throw err;
        console.log("Employee has been updated!");
        process.exit();
    });
};

//Delete a role from database
deleteEmployee = (id) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    db.query(sql, id, (err, result) => {
        if(err) throw err;
        console.log("Employee has been deleted!");
        process.exit();
    })
}

module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };