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
          addOption('department');
          break;
        case 'Add a role':
          addOption('role');
          break;
        case 'Add an employee':
          addOption('employee');
          break;
        case 'Update an employee role':
          addOption();
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

function addOption(option) {}

start();
