// import connection
const connection = require('./connection');

// properties and methods to remove items from tables
const removeQueries = {
  // sql strings used for methods
  removeEmployeeText: `DELETE FROM employee WHERE id = ?`,
  removeRoleText: `DELETE FROM role WHERE id = ?`,
  removeDepartmentText: `DELETE FROM department WHERE id = ?`,

  // methods to remove employees, roles, and departments
  removeEmployee: function (params) {
    return connection.promise().query(this.removeEmployeeText, params);
  },
  removeRole: function (params) {
    return connection.promise().query(this.removeRoleText, params);
  },
  removeDepartment: function (params) {
    return connection.promise().query(this.removeDepartmentText, params);
  },
};

module.exports = removeQueries;