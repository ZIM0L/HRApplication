CREATE TABLE applications (
    applicationid                   INTEGER NOT NULL,
    status                          NVARCHAR2(55) NOT NULL,
    submittedat                     TIMESTAMP NOT NULL,
    users_userid                    INTEGER NOT NULL, 
--  ERROR: Column name length exceeds maximum allowed length(30) 
    recruitmentpositions_positionid INTEGER NOT NULL,
    userid                          INTEGER NOT NULL
);

CREATE UNIQUE INDEX applications__idx ON
    applications (
        users_userid
    ASC );