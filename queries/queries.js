const connection = require('./connection')

const sqlQueries = {
  employeeText: `SELECT e.first_name AS first_name, e.last_name AS last_name, title, salary, name AS department, m.first_name AS manager_first, m.last_name AS manager_last
                FROM employee AS e
                JOIN role ON e.role_id = role.id 
                JOIN department ON role.department_id = department.id
                JOIN employee AS m ON e.manager_id = m.id
                `,
  roleText: "SELECT * FROM role",
  departmentText: "SELECT * FROM department",
  getEmployees: function () {
    connection.query(this.employeeText, (err, results, fields) => {
      if (err) {
        console.log(err);
      }
      console.table(results);
    });
  },
  getRoles: function () {
    connection.query(this.roleText, (err, results, fields) => {
      console.table(results);
    });
  },
  getDepartments: function () {
    connection.query(this.departmentText, (err, results, fields) => {
      console.table(results);
    });
  },
};

module.exports = sqlQueries;