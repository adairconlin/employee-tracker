# Employee Tracker

## Description
Employee Tracker is a content management system that allows a business owner to view and manager their own business. This application runs from command line and uses Node.js, Inquirer, and MySQL to accomplish the requirements. 

### User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

### Expected Functionality of Application
There were the requirements for this specific application:
```
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
```

## Installation
### Checkout my [walkthrough video]() explaining how to install and run this project!
In order to use this project, you can clone this repository onto your own system. Make sure to create a `.gitignore` file in the projects root directory that includes `node_modules/` and `.DS_Store` in good practice. This application requires Node.js, Inquirer, and MySQL2. Run the comment `npm init` to initialize Node.js, followed by `node install sequelize mysql2`.

## Usage
After the Installation steps, you have to create the database in your MySQL shell. Run the command `mysql -u root -p` followed by your MySQL password. Then, after making sure you're in the project root directory, run `source db/schema.sql` to create the database and necessary tables. You can now exit out of MySQL and run `npm start` in your regular CLI. This will begin the prompts, which you can respond to either with arrow keys and enter to select an option, or typing in a response and using enter to continue. Each time you finish a prompt line, the application will exit and you will have to type `npm start` to run it again.

## Questions
If you have any questions on this project, feel free to reach my through my [GitHub profile](https://github.com/adairconlin/e-commerce-backend), or email me at adairconlin@gmail.com.
