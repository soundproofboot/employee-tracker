const get = require('../queries/getQueries');

const findId = {
  
  role (data, response) {
  let index = data.list.indexOf(response.role);
  return data.query[0][index].id;
  },

  department(data, response) {
  let index = data.list.indexOf(response.department);
  return data.query[0][index].id;
  },

  async manager(response) {
  let managerNameArray = response.manager.split(' ');
  let managerIdCall = await get.getManagerEmployeeId([managerNameArray[0], managerNameArray[1]]);
  return managerIdCall[0][0].id;
  },

  employee(data, response) {
  let employeeNameArray = response.employee.split(' ');
  let employeeIndex = data.list.indexOf(
    `${employeeNameArray[0]} ${employeeNameArray[1]}`
  );
  return data.query[0][employeeIndex].id;
  }
}

module.exports = findId;