/* view all departments --> display table w/ department names & department id's */

SELECT * FROM department;

/* view all roles  --> display job title, role id, the department the role belongs to, salary for the role */
        
SELECT * FROM role;

/* view all employees --> display table w/ employee id's, first names, last names, job titles, departments, salaries, managers that employee reports to */
SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department_id, role.salary, employee.manager_id
FROM employee
INNER JOIN role ON employee.role_id=role.id;

/* add a department */ 
/* INSERT INTO department(id, department_name)
VALUES
(50, "Sales"); */

/*add a role */
/* INSERT INTO role(id, title, salary, department_id)
VALUES
(43, "Social Media Specialist", 85000, 010); */

/*add employee */
/* INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUE (551, "Lety", "Garcia", 011, 1 ); */


/*update an employee role */
/* UPDATE employee SET role_id = 22 WHERE first_name = “Olivai”; */
