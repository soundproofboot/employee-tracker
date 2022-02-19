INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'), ('Customer Service'), ('Design');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Software Engineer', 75000, 1),
  ('Back End Engineer', 65000, 1),
  ('E-commerce', 60000, 2),
  ('Call Center', 50000, 3),
  ('Graphic Design', 70000, 4),
  ('UI Design', 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Dave', 'Foley', 1, NULL),
  ('Bob', 'Odenkirk', 2, 1),
  ('John', 'Ennis', 2, 1),
  ('David', 'Cross', 3, NULL),
  ('Tom', 'Kenny', 4, 4),
  ('Chris', 'Farley', 5, NULL),
  ('Bruce', 'McCulloch', 6, 6);