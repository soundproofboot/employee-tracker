// import inquirer for prompts
const inquirer = require('inquirer');

// import methods to get lists for questions
const {queryDepartment, queryRole, queryEmployee, queryManager} = require('./utils/tableQueries')
// import all inquirer menus
const menus = require('./utils/menus');
// import methods to get ids from tables
const findId = require('./utils/findId');

// import console.table for display
const cTable = require('console.table');

// import main methods to interact with tables
const { addQueries: add, getQueries: get, removeQueries: remove, updateQueries: update } = require('./queries');

// main function to give user the menu and handle their response
async function openMenu() {
  // show menu
  let response = await inquirer.prompt(menus.main);
  // take response from user, run query on table, display results
  if (response.menu === 'View All Employees') {
    let results = await get.getEmployees();
    console.table(results[0]);
  }
  if (response.menu === 'View All Roles') {
    let results = await get.getRoles();
    console.table(results[0]);
  }
  if (response.menu === 'View All Departments') {
    let results = await get.getDepartments();
    console.table(results[0]);
  }

  // ask user for department, query table with department name, inform user the department was added
  if (response.menu === 'Add Department') {
    let response = await inquirer.prompt(menus.addDepartment);
    let { departmentName } = response;
    await add.addNewDepartment(departmentName);
    console.log(`${departmentName} added to database.`);
  }
  // get department list, get department from user, query table with info, inform user the role was added
  if (response.menu === 'Add Role') {
    let departmentData = await queryDepartment();
    let response = await menus.addRoleMenu(departmentData.list);
    let departmentId = findId.department(departmentData, response);

    await add.addNewRole([
      response.roleName,
      response.roleSalary,
      departmentId,
    ]);

    console.log(`${response.roleName} added to database`);
  }
  // 
  if (response.menu === 'Add Employee') {
    // get role options
    let roleData = await queryRole();
    // get manager options
    let managerData = await queryManager();
    // retrive info from user
    let response = await menus.addEmployeeMenu(roleData.list, managerData.list);
    // get necessary role id
    let roleId = findId.role(roleData, response);

    // handle either assigning no manager or correct manager id
    if (response.manager !== 'None') {
      let managerId = await findId.manager(response);
      await add.addNewEmployee([response.firstName, response.lastName, roleId, managerId]);
    } else {
      await add.addNewEmployee([response.firstName, response.lastName, roleId, null]);
    }
    // inform user the new employee was added
    console.log(`${response.firstName} ${response.lastName} added to the database.`);
  }
  // change employee's role
  if (response.menu === 'Update Employee Role') {
    // get all employees
    let employeeData = await queryEmployee();
    // get all roles
    let roleData = await queryRole();
    // get info from user
    let answers = await menus.updateRoleMenu(employeeData.list, roleData.list);

    // get role and employee id
    let roleId = findId.role(roleData, answers);
    let employeeId = findId.employee(employeeData, answers);

    // query employee table with those ids
    await update.updateEmployeeRole([roleId, employeeId]);
    console.log('Employee role updated');
  }
  // change employee's manager
  if (response.menu === 'Update Employee Manager') {
    // get employee and manager data
    let employeeData = await queryEmployee();
    let managerData = await queryManager();
    // get info from user
    let answers = await menus.updateManagerMenu(employeeData.list, managerData.list);

    // get employee and manager id
    let employeeId = findId.employee(employeeData, answers);
    let managerId;
    if (answers.manager === 'None' || answers.manager === answers.employee) {
      managerId = null;
    } else {
      managerId = await findId.manager(answers);
    }
    // query table with those ids
    await update.updateManager([managerId, employeeId]);
    console.log('Employee manager updated');
  }
  // return one manager's employees
  if (response.menu === `See Manager's Team`) {
    // get manager info
    let managerData = await queryManager();
    // ask user which manager
    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'manager',
        message: 'Choose a manager',
        choices: managerData.list
      }
    ])

    // get manager id
    let managerId = await findId.manager(answers);
    // query table with that id
    let results = await get.getManagerTeam([managerId]);

    // display results, or inform user no employees returned
    if (results[0].length) {
      console.table(results[0]);
    } else {
      console.log('This manager currently has no team');
    }
  };
  // get all employee's in a department
  if (response.menu === `See Employee's by Department`) {
    // get department data
    let departmentData = await queryDepartment();
    // get which department from user
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Select a department',
        choices: departmentData.list
      }
    ])

    // get department id
    let departmentId = findId.department(departmentData, answer);
    // query table with id
    let results = await get.getEmployeeByDepartment(departmentId);
    
    // return results or inform user there are no employees in that department
    if (results[0].length) {
      console.table(results[0]);
    } else {
      console.log('No employees in that department');
    }
  }
  // remove methods ask the user which employee/role/department to remove
  // then get correct id
  // query table with that id
  // inform user the item was removed
  if (response.menu === 'Remove an Employee') {
    let employeeData = await queryEmployee();
    let answer = await inquirer.prompt([
      {
      type: 'list',
      name: 'employee',
      message: 'Which employee would you like to remove?',
      choices: employeeData.list
      }
    ])

    let employeeId = findId.employee(employeeData, answer);
    await remove.removeEmployee(employeeId);
    console.log(`${answer.employee} has been removed from the database`)
  }
  if (response.menu === 'Remove a Role') {
    let roleData = await queryRole();
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Which role would you like to remove?',
        choices: roleData.list
      }
    ]);
    
    let roleId = findId.role(roleData, answer);
    await remove.removeRole(roleId);
    console.log(`${answer.role} has been removed from the database`);
  }
  if (response.menu === 'Remove a Department') {
    let departmentData = await queryDepartment();
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Which department would you like to remove?',
        choices: departmentData.list,
      },
    ]);

    let departmentId = findId.department(departmentData, answer)
    await remove.removeDepartment(departmentId);
    console.log(`${answer.department} was removed from the database`);
  }
  // get the total of all employee salaries in a department
  if (response.menu === `See Department's Total Budget`) {
    // get department data
    let departmentData = await queryDepartment();
    // get which department from user
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: `Which department's budget would you like to see?`,
        choices: departmentData.list,
      },
    ]);

    // get that id
    let departmentId = findId.department(departmentData, answer);
    // return all employees in that department
    let results = await get.getEmployeeByDepartment(departmentId);
    // if there are employees in that department
    if (results[0].length) {
      // map each employees salary to new array, as number
      let salaryArray = results[0].map(employee => {
        return Number(employee.salary);
      })
      // use reduce method to sum each item in the array of salaries
      let totalSalary = salaryArray.reduce((a,b) => a+b);
      // show total of all salaries to user
      console.log(`The total budget for this department is $${totalSalary}`);
    } else {
      // if no employees in that department, budget is 0
      console.log('The budget for this department is currently $0');
    }
  }
  
  // runs recursively, to bring up the menu options again
  openMenu();
}

// run the app
openMenu();
