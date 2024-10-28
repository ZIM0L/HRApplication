CREATE TABLE sessions (
    sessionsid   INTEGER NOT NULL,
    users_userid INTEGER NOT NULL,
    sessiontoken NVARCHAR2(255) NOT NULL,
    expiresat    TIMESTAMP NOT NULL,
    isactive     CHAR(1) NOT NULL,
    userid       INTEGER NOT NULL,
    createdat    TIMESTAMP
);