USE company_db;

INSERT INTO department(department_name)
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

INSERT INTO employee()