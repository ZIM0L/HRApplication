CREATE TABLE leaverequest (
    leaverequestid INTEGER NOT NULL,
    users_userid   INTEGER NOT NULL,
    leavetype      NVARCHAR2(50) NOT NULL,
    startdate      TIMESTAMP NOT NULL,
    enddate        TIMESTAMP NOT NULL,
    status         NVARCHAR2(50) NOT NULL,
    userid         INTEGER NOT NULL
);