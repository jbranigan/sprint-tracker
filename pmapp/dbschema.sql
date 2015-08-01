-- initializes database to be stored at ../projectdb.db3

CREATE TABLE projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (100), start DATE, deadline DATE, budget INTEGER (10));
CREATE TABLE sprint (id INTEGER PRIMARY KEY AUTOINCREMENT, start DATE, "end" DATE, devdays INTEGER);
CREATE TABLE sprint_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, project_id INTEGER REFERENCES projects (id), sprint_id INTEGER REFERENCES sprint (id), est_points INTEGER, points INTEGER, task_desc VARCHAR (255));
CREATE VIEW "All Flat" AS SELECT * FROM sprint_tasks t
JOIN sprint s on t.sprint_id = s.id
JOIN projects p on t.project_id = p.id;