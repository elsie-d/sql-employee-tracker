INSERT INTO department (id, department_name)
VALUES  (010, "Marketing"),
        (020, "Events"),
        (030, "Engineering"),
        (040, "Community");

INSERT INTO role (id, title, salary, department_id)
VALUES  (011, "Marketing Lead", 150000, 010),
        (012, "Campaign Manager", 95000, 010),
        (021, "Events Lead", 150000, 020),
        (022, "Event Planner", 95000, 020),
        (031, "Engineering Lead", 150000, 030),
        (032, "Database Engineer", 95000, 030),
        (041, "Community Lead", 150000, 040),
        (042, "Commnity Strategist", 95000, 040);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (111, "Sofie", "Lopez", 011,  1),
        (112, "Joe", "Jonas", 012, null ),
        (221, "Sam", "Smith", 021, null),
        (331, "Karina", "White", 032, 4),
        (441, "Olivia", "Doe", 041, 5),
        (442, "Ernesto", "Brown", 042, null);




