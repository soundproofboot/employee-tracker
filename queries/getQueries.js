const connection = require('./connection');

const getQueries = {
  employeeText: `SELECT e.first_name AS first_name, e.last_name AS last_name, title, salary, name AS department, m.first_name AS manager_first, m.last_name AS manager_last
                FROM employee AS e
                LEFT JOIN role ON e.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS m ON e.manager_id = m.id
                `,
  roleText: `SELECT r.id, r.title, r.salary, d.name AS department FROM role as r
            JOIN department AS d ON r.department_id = d.id`,
  departmentText: `SELECT * FROM department`,
  managerText: `SELECT *
                FROM employee
                WHERE manager_id IS NULL`,
  getFullEmployeeTableText: `SELECT * FROM employee`,
  managerEmployeeIdText: `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,

  getManagerTeamCondition: `WHERE e.manager_id = ?`,
  getEmployeeByDepartmentCondition: `WHERE department_id = ?`,

  getEmployees: function () {
    return connection.promise().query(this.employeeText);
  },
  getRoles: function () {
    return connection.promise().query(this.roleText);
  },
  getDepartments: function () {
    return connection.promise().query(this.departmentText);
  },
  getManagers: function () {
    return connection.promise().query(this.managerText);
  },
  getManagerEmployeeId: function (params) {
    return connection.promise().query(this.managerEmployeeIdText, params);
  },
  getFullEmployeeTable: function () {
    return connection.promise().query(this.getFullEmployeeTableText);
  },

  getManagerTeam: function (params) {
    return connection
      .promise()
      .query(`${this.employeeText} ${this.getManagerTeamCondition}`, params);
  },
  getEmployeeByDepartment: function (params) {
    return connection
      .promise()
      .query(
        `${this.employeeText} ${this.getEmployeeByDepartmentCondition}`,
        params
      );
  },
};

module.exports = getQueries;