const inquirer = require('inquirer');
const menu = require('./questions/menu');
const addDepartment = require('./questions/addDepartment');

const cTable = require('console.table');
const sqlQueries = require('./queries/queries');
const { departmentText } = require('./queries/queries');
const { listenerCount } = require('./queries/connection');

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
  if (response.menu === 'Update Employee Manager') {
    let employeeQuery = await sqlQueries.getFullEmployeeTable();
    let employeeList = employeeQuery[0].map(employee => {
      return `${employee.first_name} ${employee.last_name}`
    });
    
    let managerQuery = await sqlQueries.getManagers();
    let managerList = managerQuery[0].map((manager => {
      return `${manager.first_name} ${manager.last_name}`
    }));

    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: employeeList,
      },
      {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: ['None', ...managerList],
      },
    ]);

    let employeeNameArray = answers.employee.split(' ');
    let employeeIndex = employeeList.indexOf(`${employeeNameArray[0]} ${employeeNameArray[1]}`);
    let employeeId = employeeQuery[0][employeeIndex].id;

    let managerId;
    if (answers.manager === 'None' || answers.manager === answers.employee) {
      managerId = null;
    } else {
      let managerNameArray = answers.manager.split(' ');
      let managerIdCall = await sqlQueries.getManagerEmployeeId([
        managerNameArray[0],
        managerNameArray[1],
      ]);
      managerId = managerIdCall[0][0].id;
    }
    await sqlQueries.updateManager([managerId, employeeId]);
    console.log('Employee manager updated');
  }

  if (response.menu === `See Manager's Team`) {
    let managerQuery = await sqlQueries.getManagers();
    let managerList = managerQuery[0].map((manager) => {
      return `${manager.first_name} ${manager.last_name}`;
    });
    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'manager',
        message: 'Choose a manager',
        choices: managerList
      }
    ])

    let managerNameArray = answers.manager.split(' ');
    let managerIdCall = await sqlQueries.getManagerEmployeeId([
      managerNameArray[0],
      managerNameArray[1],
    ]);
    managerId = managerIdCall[0][0].id;
    let results = await sqlQueries.getManagerTeam([managerId]);
    console.table(results[0]);
  }

  if (response.menu === `See Employee's by Department`) {
    let departmentQuery = await sqlQueries.getDepartments();
    let departmentList = departmentQuery[0].map(department => {
      return department.name
    });
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Select a department',
        choices: departmentList
      }
    ])

    let index = departmentList.indexOf(answer.department);
    let departmentId = departmentQuery[0][index].id;

    let results = await sqlQueries.getEmployeeByDepartment(departmentId);
    if (results[0].length) {
      console.table(results[0]);
    } else {
      console.log('No employees in that department');
    }
  }
  if (response.menu === 'Remove an Employee') {
    let employeeQuery = await sqlQueries.getFullEmployeeTable();
    let employeeList = employeeQuery[0].map((employee) => {
      return `${employee.first_name} ${employee.last_name}`;
    });
    let answer = await inquirer.prompt([
      {
      type: 'list',
      name: 'employee',
      message: 'Which employee would you like to remove?',
      choices: employeeList
      }
    ])

    let employeeNameArray = answer.employee.split(' ');
    let employeeIndex = employeeList.indexOf(
      `${employeeNameArray[0]} ${employeeNameArray[1]}`
    );
    let employeeId = employeeQuery[0][employeeIndex].id;

    await sqlQueries.removeEmployee(employeeId);
    console.log(`${answer.employee} has been removed from the database`)
  }
  if (response.menu === 'Remove a Role') {
    let roleQuery = await sqlQueries.getRoles();
    let roleList = roleQuery[0].map((role) => {
      return role.title;
    });
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Which role would you like to remove?',
        choices: roleList
      }
    ])
    
    let roleIndex = roleList.indexOf(answer.role);
    let roleId = roleQuery[0][roleIndex].id;

    await sqlQueries.removeRole(roleId);
    console.log(`${answer.role} has been removed from the database`);
  }
  if (response.menu === 'Remove a Department') {
    let departmentQuery = await sqlQueries.getDepartments();
    let departmentList = departmentQuery[0].map((department) => {
      return department.name;
    });
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Which department would you like to remove?',
        choices: departmentList,
      },
    ]);

    let index = departmentList.indexOf(answer.department);
    let departmentId = departmentQuery[0][index].id;

    await sqlQueries.removeDepartment(departmentId);
    console.log(`${answer.department} was removed from the database`);
  }
  if (response.menu === `See Department's Total Budget`) {
    let departmentQuery = await sqlQueries.getDepartments();
    let departmentList = departmentQuery[0].map((department) => {
      return department.name;
    });
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: `Which department's budget would you like to see?`,
        choices: departmentList,
      },
    ]);

    let index = departmentList.indexOf(answer.department);
    let departmentId = departmentQuery[0][index].id;

    let results = await sqlQueries.getEmployeeByDepartment(departmentId);
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
