const inquirer = require("inquirer");
const mysql = require("mysql2");
const menu = require('./questions/menu');
const cTable = require("console.table");

async function doTheThing() {
  let answer = await inquirer.prompt(menu);
  if (answer.menu === 'Add Employee') {
    
  }
};



const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "soundproofboot",
    password: "upicmemberservices",
    database: "workforce",
  },
  console.log("Connected to the workforce database.")
);



doTheThing();
