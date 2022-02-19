const inquirer = require('inquirer');

// menu object containing all the questions used in different inquirer prompts
const menus = {
  // main menu
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
  // used to add a department
  addDepartment: [
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department?',
    },
  ],
  // used to add a role, needs list of departments
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

  // used to update a role, needs list of employees and roles
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

  // used to add an employee, needs list of roles and managers
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

  // used to change employee's manager, needs list of employees and managers
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
