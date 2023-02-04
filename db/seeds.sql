USE company_db;

INSERT INTO department(name)
    VALUES  ('Executive'),
    VALUES  ('Engineering'),
            ('Sales'),
            ('Legal'),
            ('Finance');

INSERT INTO role(department_id, title, salary)
    VALUES  (1, 'Owner', 600000),
    VALUES  (1, 'Partner', 450000),
    VALUES  (2, 'Lead Engineer', 150000),
            (2, 'Software Engineer', 130000),
            (2, 'Software Engineer Intern', 50000),
            (3, 'Sales Director', 135000),
            (3, 'Salesperson', 80000),
            (4, 'Legal Director', 250000),
            (4, 'Lawyer', 200000),
            (5, 'Accounting Director', 120000),
            (5, 'Accountant', 100000); 

INSERT INTO employee(manager_id, first_name, last_name, role_id)
    VALUES  (null, 'Bianca', 'Frazier', 1),
    VALUES  (1, 'Teresa', 'Hensley', 3),
            (2, 'Everly', 'Farner', 4),
            (2, 'Juan', 'Sanchez', 5),
            (1, 'Tariq', 'Moore', 6),
            (5, 'Charlie', 'Hanna', 7),
            (1, 'Safiya', 'Todd', 8),
            (7, 'Jaden', 'Doyle', 9),
            (1, 'Sabrina', 'Stuart', 10),
            (9, 'Brodie', 'Riggs', 11);