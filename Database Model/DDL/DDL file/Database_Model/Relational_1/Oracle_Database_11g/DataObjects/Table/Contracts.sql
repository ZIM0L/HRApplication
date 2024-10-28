CREATE TABLE contracts (
    contractid                 INTEGER NOT NULL,
    users_userid               INTEGER NOT NULL,
    jobpositions_jobpositionid INTEGER NOT NULL,
    contracttype               NVARCHAR2(50) NOT NULL,
    startdate                  TIMESTAMP NOT NULL,
    enddate                    TIMESTAMP NOT NULL,
    salary                     NUMBER NOT NULL,
    hoursperweek               INTEGER NOT NULL,
    noticeperiod               NVARCHAR2(1) NOT NULL,
    benefits                   unknown 
--  ERROR: Datatype UNKNOWN is not allowed 
     NOT NULL,
    isactive                   CHAR(1) NOT NULL,
    userid                     INTEGER NOT NULL
);

CREATE UNIQUE INDEX contracts__idx ON
    contracts (
        users_userid
    ASC );