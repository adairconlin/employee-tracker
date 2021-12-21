const db = require("./db/connection");
const inquirer = require("inquirer");
const { getDepartments, addDepartment, deleteDepartment } = require("./routes/department");

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

promptRoles = data => {
    switch(data.command) {
        case "View all roles":
            getRoles();
            break;

        case "Add a role":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What role would you like to add?",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the name of the role you would like to add.");
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                addRole(response.name);
            })

        case "Delete a role":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "Provide the id of the role you want to delete:",
                    validate: response => {
                        if(response) {
                            return true;
                        } else {
                            console.log("Please provide the id of the role you would like to delete.");
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                deleteRole(response.id);
            })
    }
};

promptEmployees = data => {
    console.log(data.command);
};

promptToExit = async () => {
    const response = await inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Would you like to continue?"
        }
    ]);
    console.log(response);
    if (response) {
        introPrompt();
    } else {
        prompt.ui.close();
    }
}

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
