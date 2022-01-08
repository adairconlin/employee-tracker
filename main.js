const db = require("./db/connection");
const inquirer = require("inquirer");
const { getDepartments, addDepartment, deleteDepartment } = require("./routes/department");
const { getRoles, addRole, deleteRole } = require("./routes/role");
const { getEmployees, addEmployee, updateEmployee, deleteEmployee } = require("./routes/employee");

//Sql server connection response
db.connect(err => {
    if(err) throw err;
});

//Begin CLI prompts
const introPrompt = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "category",
            message: "Choose a category:",
            choices: ["Departments", "Roles", "Employees"]
        },
        //DEPARTMENT PROMPTS
        {
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "Add a department",
                "Delete a department"
            ],
            when: ({category}) => {
                if(category === "Departments") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        //ROLES PROMPTS
        {
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: [
                "View all roles",
                "Add a role",
                "Delete a role"
            ],
            when: ({category}) => {
                if(category === "Roles") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        //EMPLOYEE PROMPTS
        {
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "Add an employee",
                "Update an employee",
                "Delete an employee"
            ],
            when: ({category}) => {
                if(category === "Employees") {
                    return true;
                } else {
                    return false;
                }
            }
        },
    ])
    .then((response) => {
        return response;
    })
};

//Department user action prompts
promptDepartments = data => {
    switch(data.command) {
        case "View all departments":
            getDepartments();
            break;

        case "Add a department":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What department would you like to add?",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the name of the department you would like to add");
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                addDepartment(response.name);
            })

        case "Delete a department":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "Provide the id of the department you want to delete:",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the id of the department you would like to delete");
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                deleteDepartment(response.id);
            })
    }
};

//Role user action prompts
promptRoles = data => {
    switch(data.command) {
        case "View all roles":
            getRoles();
            break;

        case "Add a role":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the title of this role?",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the title of the role you would like to add.");
                            return false;
                        }
                    }
                },
                {
                    type: "number",
                    name: "salary",
                    message: "What is this roles salary? (Numerical input only)",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide a salary in numbers only.");
                            return false;
                        }
                    }
                },
                {
                    type: "number",
                    name: "department_id",
                    message: "Please provide a department id for this role:",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide a department id for this role.");
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                addRole(response.title, response.salary, response.department_id);
            })

        case "Delete a role":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Provide the title of the role you want to delete:",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the title of the role you would like to delete.");
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                deleteRole(response.title);
            })
    }
};

//Employee user action prompts
promptEmployees = data => {
    switch(data.command) {
        case "View all employees":
            getEmployees();
            break;

        case "Add an employee":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the first name of this employee?",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the first name of the employee you want to add.");
                            return false;
                        }
                    }
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the last name of this employee?",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the last name of the employee you want to add.");
                            return false;
                        }
                    }
                },
                {
                    type: "number",
                    name: "role_id",
                    message: "Please provide a role id for this employee:",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide a role id for this employee.");
                            return false;
                        }
                    }
                },
                {
                    type: "number",
                    name: "manager_id",
                    message: "Please provide a manager id for this employee, if applicable:",
                }
            ])
            .then((response) => {
                addEmployee(response.first_name, response.last_name, response.role_id, response.manager_id);
            })

        case "Update an employee":
            return inquirer.prompt ([
                {
                    type: "input",
                    name: "id",
                    message: "Provide the id of the employee you want to update:",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the if of the employee you would like to update.");
                            return false;
                        }
                    }
                },
                {
                    type: "list",
                    name: "choice",
                    message: "What would you like to update?",
                    choices: [
                        "first_name",
                        "last_name",
                        "role_id",
                        "manager_id"
                    ]
                },
                {
                    type: "input",
                    name: "change",
                    message: "What would you like to change it to?",
                }
            ])
            .then((response) => {
                updateEmployee(response.id, response.choice, response.change);
            })

        case "Delete an employee":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "Provide the id of the employee you want to delete:",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the id of the employee you would like to delete.");
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                deleteEmployee(response.id);
            })
    }
};

introPrompt()
    .then(response => {
        if(response.category === "Departments") {
            promptDepartments(response);
        } else if(response.category === "Roles") {
            promptRoles(response);
        } else if(response.category === "Employees") {
            promptEmployees(response);
        }
    })
