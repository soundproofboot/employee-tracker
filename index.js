const inquirer = require("inquirer");
const menu = require('./questions/menu');
const cTable = require("console.table");
const sqlQueries = require('./queries/queries');

sqlQueries.getEmployees();
// inquirer.prompt(menu).then(x => console.log(x));