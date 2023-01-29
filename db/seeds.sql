USE company_db;

INSERT INTO department(name)
    VALUES  ('Engineering'),
            ('Sales'),
            ('Legal'),
            ('Finance');

INSERT INTO role(department_id, title, salary)
    VALUES  (1, 'Lead Engineer', 150000),
            (1, 'Software Engineer', 130000),
            (1, 'Software Engineer Intern', 50000),
            (2, 'Sales Director', 135000),
            (2, 'Salesperson', 80000),
            (3, 'Legal Director', 250000),
            (3, 'Lawyer', 200000),
            (4, 'Accounting Director', 120000),
            (4, 'Accountant', 100000); 

INSERT INTO employee(manager_id, first_name, last_name, role_id)
    VALUES  (null, 'Teresa', 'Hensley', 1),
            (1, 'Everly', 'Farner', 2),
            (1, 'Juan', 'Sanchez', 3),
            (null, 'Tariq', 'Moore', 4),
            (4, 'Charlie', 'Hanna', 5),
            (null, 'Safiya', 'Todd', 6),
            (6, 'Jaden', 'Doyle', 7),
            (null, 'Sabrina', 'Stuart', 8),
            (8, 'Brodie', 'Riggs', 9);