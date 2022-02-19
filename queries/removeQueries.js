const connection = require('./connection');

const removeQueries = {
  removeEmployeeText: `DELETE FROM employee WHERE id = ?`,
  removeRoleText: `DELETE FROM role WHERE id = ?`,
  removeDepartmentText: `DELETE FROM department WHERE id = ?`,

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