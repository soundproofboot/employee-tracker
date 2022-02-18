const inquirer = require('inquirer');

const {queryDepartment, queryRole, queryEmployee, queryManager, findRoleId, findDepartmentId, findEmployeeId, findManagerId } = require('./utils/helper')
const menus = require('./utils/menus');
const findId = require('./utils/findId');

const cTable = require('console.table');

const { addQueries: add, getQueries: get, removeQueries: remove, updateQueries: update } = require('./queries');

async function openMenu() {
  let response = await inquirer.prompt(menus.main);
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
  if (response.menu === 'Add Department') {
    let response = await inquirer.prompt(menus.addDepartment);
    let { departmentName } = response;
    await add.addNewDepartment(departmentName);
    console.log(`${departmentName} added to database.`);
  }
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
  if (response.menu === 'Add Employee') {
    let roleData = await queryRole();
    let managerData = await queryManager();
    let response = await menus.addEmployeeMenu(roleData.list, managerData.list);
    let roleId = findId.role(roleData, response);

    if (response.manager !== 'None') {
      let managerId = await findId.manager(response);
      await add.addNewEmployee([response.firstName, response.lastName, roleId, managerId]);
    } else {
      await add.addNewEmployee([response.firstName, response.lastName, roleId, null]);
    }
    console.log(`${response.firstName} ${response.lastName} added to the database.`);
  }
  if (response.menu === 'Update Employee Role') {
    let employeeData = await queryEmployee();
    let roleData = await queryRole();
    let answers = await menus.updateRoleMenu(employeeData.list, roleData.list);

    let roleId = findId.role(roleData, answers);
    let employeeId = findId.employee(employeeData, answers);

    await update.updateEmployeeRole([roleId, employeeId]);
    console.log('Employee role updated');
  }
  if (response.menu === 'Update Employee Manager') {
    let employeeData = await queryEmployee();
    let managerData = await queryManager();
    let answers = await menus.updateManagerMenu(employeeData.list, managerData.list);

    let employeeId = findId.employee(employeeData, answers);
    let managerId;
    if (answers.manager === 'None' || answers.manager === answers.employee) {
      managerId = null;
    } else {
      managerId = await findId.manager(answers);
    }
    await update.updateManager([managerId, employeeId]);
    console.log('Employee manager updated');
  }
  if (response.menu === `See Manager's Team`) {
    let managerData = await queryManager();
    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'manager',
        message: 'Choose a manager',
        choices: managerData.list
      }
    ])

    let managerId = await findId.manager(answers);
    let results = await get.getManagerTeam([managerId]);

    if (results[0].length) {
      console.table(results[0]);
    } else {
      console.log('This manager currently has no team');
    }
  };
  if (response.menu === `See Employee's by Department`) {
    let departmentData = await queryDepartment();
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Select a department',
        choices: departmentData.list
      }
    ])

    let departmentId = findId.department(departmentData, answer);
    let results = await get.getEmployeeByDepartment(departmentId);
    
    if (results[0].length) {
      console.table(results[0]);
    } else {
      console.log('No employees in that department');
    }
  }
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
  if (response.menu === `See Department's Total Budget`) {
    let departmentData = await queryDepartment();
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: `Which department's budget would you like to see?`,
        choices: departmentData.list,
      },
    ]);

    let departmentId = findId.department(departmentData, answer);
    let results = await get.getEmployeeByDepartment(departmentId);
    if (results[0].length) {
      let salaryArray = results[0].map(employee => {
        return Number(employee.salary);
      })
      let totalSalary = salaryArray.reduce((a,b) => a+b);
      console.log(`The total budget for this department is $${totalSalary}`);
    } else {
      console.log('The budget for this department is currently $0');
    }
  }
  
  openMenu();
}

openMenu();
