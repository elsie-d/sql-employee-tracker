const sequelize = require('./config/connection')
const inquirer = require('inquirer');

const mysql = require('mysql2')
require("dotenv").config();


const db = mysql.createConnection(
  {
  host: 'localhost',  
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  },
  console.log(`Connected to the movies_db database.`)
);


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

            case "Add a new role":
            newRole();
            break;

            case "Add a new employee":
            newEmp();
            break;

            case "Update employee role":
              updateEmp();
              break;

            default:
            console.log("hmm something went wrong, try again");   

        }
      

        
    });

  } ;


//Update Emp

const updateEmp = () =>{
  inquirer
  .prompt([
    {
      name: "empIdU",
      type: "input",
      message: "What is the employee id of the employee you need to update?"
    },
    {
      name: "updRole",
      type: "input",
      message: "What the new role of this employee?"
    }
  
  
  ]) 
  .then((answer) => {


  })



}

//Add a new Emp
const newEmp = () => {
  inquirer
  .prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the first name of the new Employee?"
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the last name of the new Employee?"
    },
    {
      name: "empDep",
      type: "list",
      message: "What department will they be a part of?",
      choices: [
        "Marketing",
        "Finance",
        "Community"
      ]
    },
    {
      name: "empRole",
      type: "list",
      message: "What is the role of the new Employee?",
      choices: [
        "Manager",
        "Director",
        "VP",
        "Manager"
      ]
    },
    {
      name: "empManager",
      type: "list",
      message: "Select Manager if applicable",
      choices: [
        "Joe",
        "Daisy",
        "N/A"
       
      ]
    },


  ])
  .then((answer) => {
    const deptIdQ = `SELECT id FROM department WHERE department_name="${answer.empDep}"`
    const deptId = deptIdQ.value
    const roleID =`SELECT id FROM role WHERE title="${answer.empRole}" AND department_id=${deptId}`

    const sqlNewEmp = `INSERT INTO employee(first_name, last_name, ${roleID})`

    db.query(sqlNewEmp, (err, res) => {
      if (err) {
      console.log(err)
      return;
     }
     displayEmpT()
      console.log(answer.newDep)
     
     });
  })


};



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
        name: "departmentID",
        type: "list",
        message: "What is the ID of the department they belong to?",
        choices:[
            10,
            11,
            12

        ] 
    }, 

           ])
           .then((answer) => {
            
            const sqlNewRole = `INSERT INTO role(title, salary, department_id) VALUES ("${answer.newRole}", ${answer.salary}, ${answer.departmentID})`;
            db.query(sqlNewRole, (err, res) => {
            if (err) {
            console.log(err)
            return;
           }
           displayRoleT()
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

            const sqlNewDept = `INSERT INTO department (department_name) VALUES ("${answer.newDep}")`;
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
      


// Display department Table
function displyDeptT() {
  const sqlDept = `SELECT * FROM department`;
  db.query(sqlDept, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    console.table(res)
    startQ();
    

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
    startQ()
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
    startQ()
    });    
};





  startQ();

