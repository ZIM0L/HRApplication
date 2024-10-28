CREATE TABLE trainings (
    trainingid  INTEGER NOT NULL,
    title       NVARCHAR2(255) NOT NULL,
    description NVARCHAR2(1) NOT NULL,
    startdate   TIMESTAMP NOT NULL,
    enddate     TIMESTAMP NOT NULL
);