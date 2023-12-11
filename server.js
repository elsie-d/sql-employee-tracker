const sequelize = require('./config/connection')
const inquirer = require('inquirer');
//const express = require('express');
const mysql = require('mysql2')
require("dotenv").config();
//const PORT = process.env.PORT || 3001;
//const app = express()

/* // Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); */

const db = mysql.createConnection(
  {
  host: 'localhost',  
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  },
  console.log(`Connected to the movies_db database.`)
);

//const db = mysql.sequelize
console.log('sequelize connected to server')

  // First question

 const startQ = () => {
    inquirer
    .prompt([
       {
        name: "initRequest",
        type: "list",
        message: "Select a request type", 
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a new department",
            "Add a new role",
            "Add a new employee",
            "Update an employee's role"
        ]
       } 
    ])
    .then((answer) => {
        switch(answer.initRequest){
            case "View all departments":
              displyDeptT();
            break;
            case "View all roles": 
              displayRoleT();
            break;
            case "View all employees":           
              displayEmpT();    
            break;
            case "Add a new department":
              newDeptQ();
            break;    

            case "Add a new role"
            newRole();
            break;

            default:
            console.log("hmm something went wrong, try again");   

        }
      

        
    });

  } ;



//New Role
const newRole = () => {
  inquirer
    .prompt([
       {
         name: "newRole",
         type: "input",
         message: "What is the name of the new Role you'd like to add?", 
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salry for this role?", 
     }, 
      {
        name: "department",
        type: "list",
        message: "What department will this role belong to?",
        choices:[
            "Marketing",
            "Events",
            "Engineering",
            "Community",
            "Sales",
            "HR"

        ] 
    }, 

           ])
           .then((answer) => {
            switch(answer.department){
            case "Marketing":
            }




            const sqlNewRole = `INSERT INTO role(id, title, salary, department_id) VALUES (43, "${answer.newRole}", ${answer.salary}, 010);`;
            db.query(sqlNewDept, (err, res) => {
            if (err) {
            console.log(err)
            return;
           }
            displyDeptT()
            console.log(answer.newDep)
           });
});
};






//New Department 

const newDeptQ = () => {
  inquirer
    .prompt([
       {
         name: "newDep",
         type: "input",
         message: "What is the name of the new Department you'd like to add?", 
      }
           ])
           .then((answer) => {

            const sqlNewDept = `INSERT INTO department (id, department_name) VALUES (999, "${answer.newDep}")`;
            db.query(sqlNewDept, (err, res) => {
            if (err) {
            console.log(err)
            return;
           }
            displyDeptT()
            console.log(answer.newDep)
           });
});
};
      // Insert into dept table

/* function insertDept() {
  const sqlNewDept = `INSERT INTO department (department_name) VALUES (`${answer.newDep}`)`;
  db.query(sqlNewDept, (err, res) => {
    if (err) {
      res.status(500),json({error: err.message});
      return;
    }
    displyDeptT()

  })

} */



// Display department Table
function displyDeptT() {
  const sqlDept = `SELECT * FROM department`;
  db.query(sqlDept, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    console.table(res)
    }); 

};

// Display role Table
function displayRoleT() {
  const sqlRole = `SELECT * FROM role`;
  db.query(sqlRole, (err, res) => {
    if (err) {
    res.status(500).json({ error: err.message });
    return;
          }
    console.table(res)
    //startQ()
    });    
};

// Display employee Table

function displayEmpT() {
  const sqlEmp = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department_id, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id=role.id;`;
  db.query(sqlEmp, (err, res) => {
    if (err) {
    res.status(500).json({ error: err.message });
    return;
          }
    console.table(res)
    //startQ()
    });    
};

  //Add new dept




  startQ();

