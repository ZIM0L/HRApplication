CREATE TABLE loginhistory (
    loginid      INTEGER NOT NULL,
    users_userid INTEGER NOT NULL,
    logintime    TIMESTAMP NOT NULL,
    ipaddress    NVARCHAR2(45) NOT NULL,
    issuccessful CHAR(1) NOT NULL,
    userid       INTEGER NOT NULL
);