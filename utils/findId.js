// import get queries
const get = require('../queries/getQueries');

// helper methods to get correct id's needed for other functions
const findId = {
  // gets a role's id
  role (data, response) {
  let index = data.list.indexOf(response.role);
  return data.query[0][index].id;
  },

  // gets a department's id
  department(data, response) {
  let index = data.list.indexOf(response.department);
  return data.query[0][index].id;
  },

  // get's a manager's employee id
  async manager(response) {
  let managerNameArray = response.manager.split(' ');
  let managerIdCall = await get.getManagerEmployeeId([managerNameArray[0], managerNameArray[1]]);
  return managerIdCall[0][0].id;
  },

  // get's an employee's id
  employee(data, response) {
  let employeeNameArray = response.employee.split(' ');
  let employeeIndex = data.list.indexOf(
    `${employeeNameArray[0]} ${employeeNameArray[1]}`
  );
  return data.query[0][employeeIndex].id;
  }
}

module.exports = findId;