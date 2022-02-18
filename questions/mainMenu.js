const menu = [
  {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Update Employee Manager',
      `See Manager's Team`,
      `See Employee's by Department`,
      'Remove an Employee',
      'Remove a Role',
      'Remove a Department',
      `See Department's Total Budget`
    ]
  }
];

module.exports = menu;