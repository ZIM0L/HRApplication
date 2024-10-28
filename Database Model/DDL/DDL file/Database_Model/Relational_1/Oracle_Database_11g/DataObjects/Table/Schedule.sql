CREATE TABLE schedule (
    scheduleid   INTEGER NOT NULL,
    starttime    TIMESTAMP NOT NULL,
    endtime      TIMESTAMP NOT NULL,
    type         NVARCHAR2(50) NOT NULL,
    description  NVARCHAR2(255) NOT NULL,
    users_userid INTEGER NOT NULL,
    userid       INTEGER NOT NULL
);