const addRole = [
  {
    type: 'input',
    name: 'roleName',
    message: 'What is the name of the role?'
  },
  {
    type: 'input',
    name: 'roleSalary',
    message: 'What is the salary for the role?'
  },
  {
    type: 'list',
    name: 'department',
    message: 'Which department does the role belong to?',
    list: departmentList
  }
]


module.exports = addRole;