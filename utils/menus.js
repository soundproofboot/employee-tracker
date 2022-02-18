const inquirer = require('inquirer');

const menus = {
  main: [
    {
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Update Employee Manager',
        `See Manager's Team`,
        `See Employee's by Department`,
        'Remove an Employee',
        'Remove a Role',
        'Remove a Department',
        `See Department's Total Budget`,
      ],
    },
  ],
  addDepartment: [
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department?',
    },
  ],
  async addRoleMenu(departmentList) {
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

    return response;
  },

  async updateRoleMenu(employeeList, roleList) {
    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: employeeList,
      },
      {
        type: 'list',
        name: 'role',
        message: 'Which role would you like to assign the employee?',
        choices: roleList,
      },
    ]);
    return answers;
  },

  async addEmployeeMenu(roleList, managerList) {
    let response = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
      },
      {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: roleList,
      },
      {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: ['None', ...managerList],
      },
    ]);
    return response;
  },

  async updateManagerMenu(employeeList, managerList) {
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
    return answers;
  },
};

module.exports = menus;
