const connection = require('./connection')

const sqlQueries = {
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
  addDepartmentText: `INSERT INTO department (name)
                      VALUES(?)`,
  addRoleText: `INSERT INTO role (title, salary, department_id)
                VALUES(?,?,?)`,
  addEmployeeText: `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES(?,?,?,?)`,
  managerEmployeeIdText: `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
  updateEmployeeRoleText: `UPDATE employee
                          SET role_id = ?
                          WHERE id = ?`,
  getFullEmployeeTableText: `SELECT * FROM employee`,
  updateManagerText: `UPDATE employee
                      SET manager_id = ?
                      WHERE id = ?`,
  getManagerTeamCondition: `WHERE e.manager_id = ?`,
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
  getManagerEmployeeId: function(params) {
    return connection.promise().query(this.managerEmployeeIdText, params)
  },
  getFullEmployeeTable: function() {
    return connection.promise().query(this.getFullEmployeeTableText)
  },
  addNewDepartment: function (department) {
    return connection.promise().query(this.addDepartmentText, department);
  },
  addNewRole: function (params) {
    return connection.promise().query(this.addRoleText, params);
  },
  addNewEmployee: function(params) {
    return connection.promise().query(this.addEmployeeText, params);
  },
  updateEmployeeRole: function(params) {
    return connection.promise().query(this.updateEmployeeRoleText, params)
  },
  updateManager: function(params) {
    return connection.promise().query(this.updateManagerText, params);
  },
  getManagerTeam: function(params) {
    return connection.promise().query(`${this.employeeText} ${this.getManagerTeamCondition}`, params)
  }
};

module.exports = sqlQueries;