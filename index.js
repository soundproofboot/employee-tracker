const inquirer = require('inquirer');
const menu = require('./questions/menu');
const addDepartment = require('./questions/addDepartment');

const cTable = require('console.table');
const sqlQueries = require('./queries/queries');
const { departmentText } = require('./queries/queries');

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
  if (response.menu === 'View All Roles') {
    let results = await sqlQueries.getRoles();
    console.table(results[0]);
  }
  if (response.menu === 'View All Departments') {
    let results = await sqlQueries.getDepartments();
    console.table(results[0]);
  }
  if (response.menu === 'Add Department') {
    let response = await inquirer.prompt(addDepartment);
    let { departmentName } = response;
    await sqlQueries.addNewDepartment(departmentName);
    console.log(`${departmentName} added to database.`);
  }
  if (response.menu === 'Add Role') {
    let departmentQuery = await sqlQueries.getDepartments();
    let departmentList = departmentQuery[0].map((department) => {
      return department.name;
    });
    let response = await inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for the role?',
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department does the role belong to?',
        choices: departmentList,
      },
    ]);
    let index = departmentList.indexOf(response.department);
    let departmentId = departmentQuery[0][index].id;
    await sqlQueries.addNewRole([
      response.roleName,
      response.roleSalary,
      departmentId,
    ]);
    console.log(departmentId);
    // console.log(response);
  }
  if (response.menu === 'Add Employee') {
    let roleQuery = await sqlQueries.getRoles();
    let roleList = roleQuery[0].map((role) => {
      return role.title;
    });
    let managerQuery = await sqlQueries.getManagers();
    let managerList = managerQuery[0].map((manager => {
      return `${manager.first_name} ${manager.last_name}`;
    }))
    let response = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?"
      },
      {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: roleList
      },
      {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: ['None', ...managerList]
      }
    ]);
    let index = roleList.indexOf(response.role);
    let roleId = roleQuery[0][index].id;

    if (response.manager !== 'None') {
      let managerNameArray = response.manager.split(' ');
      let managerIdCall = await sqlQueries.getManagerEmployeeId([managerNameArray[0], managerNameArray[1]]);
      let managerId = managerIdCall[0][0].id;

      await sqlQueries.addNewEmployee([response.firstName, response.lastName, roleId, managerId]);
      console.log(`${response.firstName} ${response.lastName} added to the database.`);
    } else {
      await sqlQueries.addNewEmployee([response.firstName, response.lastName, roleId, null]);
            console.log(`${response.firstName} ${response.lastName} added to the database.`);
    }
  }
  if (response.menu === 'Update Employee Role') {
    let employeeQuery = await sqlQueries.getFullEmployeeTable();
    let employeeList = employeeQuery[0].map(employee => {
      return `${employee.first_name} ${employee.last_name}`
    });

    let roleQuery = await sqlQueries.getRoles();
    let roleList = roleQuery[0].map((role) => {
      return role.title;
    });

    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: employeeList
      },
      {
        type: 'list',
        name: 'role',
        message: 'Which role would you like to assign the employee?',
        choices: roleList
      }
    ])
    let roleIndex = roleList.indexOf(answers.role);
    let roleId = roleQuery[0][roleIndex].id;
    
    let employeeNameArray = answers.employee.split(' ');
    let employeeIndex = employeeList.indexOf(`${employeeNameArray[0]} ${employeeNameArray[1]}`);
    let employeeId = employeeQuery[0][employeeIndex].id;

    await sqlQueries.updateEmployeeRole([roleId, employeeId]);
    console.log('Employee role updated');
  }

  openMenu();
}

openMenu();
