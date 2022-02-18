const inquirer = require('inquirer');
const get = require('../queries/getQueries')

async function addRoleMenu(departmentList) {
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
};

async function updateRoleMenu(employeeList, roleList) {
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
};

async function addEmployeeMenu(roleList, managerList) {
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
}

async function updateManagerMenu(employeeList, managerList) {
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
}
async function queryDepartment() {
  let departmentQuery = await get.getDepartments();
  let departmentList = departmentQuery[0].map((department) => {
    return department.name;
  });
  return {
    list: departmentList,
    query: departmentQuery
  };
};

async function queryRole() {
  let roleQuery = await get.getRoles();
  let roleList = roleQuery[0].map((role) => {
    return role.title;
  });
  return {
    list: roleList,
    query: roleQuery
  }
}

async function queryEmployee() {
  let employeeQuery = await get.getFullEmployeeTable();
  let employeeList = employeeQuery[0].map((employee) => {
    return `${employee.first_name} ${employee.last_name}`;
  });
  return {
    list: employeeList,
    query: employeeQuery
  }
}

async function queryManager() {
  let managerQuery = await get.getManagers();
  let managerList = managerQuery[0].map((manager) => {
    return `${manager.first_name} ${manager.last_name}`;
  });
  return {
    list: managerList,
    query: managerQuery
  };
}

function findRoleId(data, response) {
  let index = data.list.indexOf(response.role);
  return data.query[0][index].id;
}

function findDepartmentId(data, response) {
  let index = data.list.indexOf(response.department);
  return data.query[0][index].id;
}

async function findManagerId(response) {
  let managerNameArray = response.manager.split(' ');
  let managerIdCall = await get.getManagerEmployeeId([managerNameArray[0], managerNameArray[1]]);
  return managerIdCall[0][0].id;
}

function findEmployeeId(data, response) {
  let employeeNameArray = response.employee.split(' ');
  let employeeIndex = data.list.indexOf(
    `${employeeNameArray[0]} ${employeeNameArray[1]}`
  );
  return data.query[0][employeeIndex].id;
}
module.exports = { addRoleMenu, updateRoleMenu, queryDepartment, queryRole, queryEmployee, queryManager, addEmployeeMenu, findRoleId, findDepartmentId, findManagerId, findEmployeeId, updateManagerMenu };

