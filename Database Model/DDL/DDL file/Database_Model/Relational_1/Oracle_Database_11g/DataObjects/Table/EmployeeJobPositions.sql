CREATE TABLE employeejobpositions (
    employeejobpositionid      INTEGER NOT NULL,
    users_userid               INTEGER NOT NULL,
    jobpositions_jobpositionid INTEGER NOT NULL,
    startdate                  TIMESTAMP NOT NULL,
    enddate                    TIMESTAMP,
    userid                     INTEGER NOT NULL
);

CREATE UNIQUE INDEX employeejobpositions__idx ON
    employeejobpositions (
        users_userid
    ASC );