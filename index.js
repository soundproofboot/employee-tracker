const inquirer = require("inquirer");
const menu = require('./questions/menu');
const cTable = require("console.table");
const sqlQueries = require('./queries/queries');

// sqlQueries.getEmployees();
// sqlQueries.getDepartments();
// sqlQueries.getRoles();
// sqlQueries.addDepartment('Electrical');

async function openMenu() {
  let response = await inquirer.prompt(menu);
  if (response.menu === 'View All Employees') {
    let results = await sqlQueries.getEmployees();
    console.table(results[0]);
  }
  openMenu();
};

openMenu();