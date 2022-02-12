
const sqlQueries = {
  employeeText: 'SELECT * FROM employee',
  roleText: 'SELECT * FROM role',
  departmentText: 'SELECT * FROM department',
  getEmployees() {
    connection.query(this.employeeText, (err, results, fields) => {
      console.table(results);
    })
  },
  getRoles() {
    connection.query(this.roleText, (err, results, fields) => {
      console.table(results);
    })
  },
  getDepartments() {
    connection.query(this.departmentText, (err, results, fields) => {
      console.table(results);
    })
  }
}