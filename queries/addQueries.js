// import connection to database
const connection = require('./connection');

// object containing properties and methods to add items to database tables
const addQueries = {
  // sql strings used for methods
  addDepartmentText: `INSERT INTO department (name)
                      VALUES(?)`,
  addRoleText: `INSERT INTO role (title, salary, department_id)
                VALUES(?,?,?)`,
  addEmployeeText: `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES(?,?,?,?)`,

  // methods to add departments, roles, employees
  addNewDepartment: function (department) {
    return connection.promise().query(this.addDepartmentText, department);
  },
  addNewRole: function (params) {
    return connection.promise().query(this.addRoleText, params);
  },
  addNewEmployee: function (params) {
    return connection.promise().query(this.addEmployeeText, params);
  },
};

module.exports = addQueries;