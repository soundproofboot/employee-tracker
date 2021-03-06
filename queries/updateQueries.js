// import connection
const connection = require('./connection');

// properties and methods used to update parts of tables
const updateQueries = {
  updateEmployeeRoleText: `UPDATE employee
                          SET role_id = ?
                          WHERE id = ?`,
  updateManagerText: `UPDATE employee
                      SET manager_id = ?
                      WHERE id = ?`,

  updateEmployeeRole: function (params) {
    return connection.promise().query(this.updateEmployeeRoleText, params);
  },
  updateManager: function (params) {
    return connection.promise().query(this.updateManagerText, params);
  },
};

module.exports = updateQueries;