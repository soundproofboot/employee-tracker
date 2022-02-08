INSERT INTO department (name)
VALUES ('Engineering'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Software Engineer', 75000, 1),
  ('Customer Service', 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Dave', 'Foley', 1, NULL),
  ('Bob', 'Odenkirk', 2, 1),
  ('John', 'Ennis', 2, 1);