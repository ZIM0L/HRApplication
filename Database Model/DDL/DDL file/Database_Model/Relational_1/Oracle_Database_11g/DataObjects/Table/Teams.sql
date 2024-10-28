CREATE TABLE teams (
    teamid    INTEGER NOT NULL,
    name      NVARCHAR2(255) NOT NULL,
    createdat TIMESTAMP NOT NULL,
    isactive  CHAR(1) NOT NULL
);