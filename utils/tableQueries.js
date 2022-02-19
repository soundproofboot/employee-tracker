const inquirer = require('inquirer');
const get = require('../queries/getQueries')

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

module.exports = { queryDepartment, queryRole, queryEmployee, queryManager };

