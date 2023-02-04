const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`connected to the database: company_db`)
);

function start() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Nothing more to do',
        ],
        name: 'action',
      },
    ])
    .then(function (input) {
      switch (input.action) {
        case 'View all departments':
          viewAll('department');
          break;
        case 'View all roles':
          viewAll('role');
          break;
        case 'View all employees':
          viewAll('employee');
          break;
        case 'Add a department':
          addDpt();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmp();
          break;
        case 'Update an employee role':
          updateRole();
          break;
        case 'Nothing more to do':
          stop();
          break;
      }
    });
}

function viewAll(option) {
  if (option === 'department') {
    db.query(`SELECT * FROM department`, function (err, res) {
      console.table(res);
      if (err) console.log(err);
    });
  } else if (option === 'role') {
    db.query(`SELECT * FROM role`, function (err, res) {
      console.table(res);
      if (err) console.log(err);
    });
  } else if (option === 'employee') {
    db.query(`SELECT * FROM employee`, function (err, res) {
      console.table(res);
      if (err) console.log(err);
    });
  }
  start();
}

function addDpt() {
  inquirer
    .prompt({
      type: 'input',
      message: 'What department would you like to add?',
      name: 'newDept',
    })
    .then((answer) => {
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        answer.newDept,
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            db.query(`SELECT * FROM department`, function (err, res) {
              console.table(res);
              if (err) console.log(err);
              start();
            });
          }
        }
      );
    });
}

function addRole() {
  dptChoice = () =>
    db
      .promise()
      .query(`SELECT * FROM department`)
      .then((rows) => {
        let dpts = rows[0].map((obj) => obj.name);
        return dpts;
      });
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What department is this role in?',
        name: 'incDpt',
        choices: dptChoice,
      },
      {
        type: 'input',
        message: 'What role would you like to add?',
        name: 'newRole',
      },
      {
        type: 'input',
        message: 'What is the salary of this role?',
        name: 'roleSal',
      },
    ])
    .then((answer) => {
      db.promise()
        .query(`SELECT id FROM department WHERE name = ?`, answer.incDpt)
        .then((ans) => {
          let newId = ans[0].map((obj) => obj.id);
          return newId[0];
        })
        .then((newId) => {
          db.promise().query(
            `INSERT INTO role (department_id, title, salary) VALUES (?, ?, ?)`,
            [newId, answer.newRole, answer.roleSal]
          );
          db.query(`SELECT * FROM role`, function (err, res) {
            console.table(res);
            if (err) console.log(err);
          });
          start();
        });
    });
}

function addEmp() {
  const roleChoice = () =>
    db
      .promise()
      .query(`SELECT * FROM role`)
      .then((rows) => {
        let roles = rows[0].map((obj) => obj.title);
        return roles;
      });
  const managerChoice = () =>
    db
      .promise()
      .query(`SELECT * FROM employee`)
      .then((rows) => {
        let manager = rows[0].map((obj) => obj.first_name);
        return manager;
      });
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter employee first name',
        name: 'firstName',
      },
      {
        type: 'input',
        message: 'Enter employee last name',
        name: 'lastName',
      },
      {
        type: 'list',
        message: 'What is the role of the employee?',
        name: 'empRole',
        choices: roleChoice,
      },
      {
        type: 'list',
        message: 'Who will be their manager?',
        name: 'manager',
        choices: managerChoice,
      },
    ])
    .then((answer) => {
      console.log(answer);
      db.promise()
        .query(`SELECT id FROM employee WHERE first_name = ?`, answer.manager)
        .then((manName) => {
          let managerId = manName[0].map((obj) => obj.id);
          return managerId[0];
        })
        .then((managerId) => {
          db.promise().query(
            `INSERT INTO employee (manager_id, first_name, last_name) VALUES (${managerId}, '${answer.firstName}', '${answer.lastName}')`
          );
          //[managerId, answer.firstName, answer.lastName, dptId];
        });
      start();
    });
}

start();
