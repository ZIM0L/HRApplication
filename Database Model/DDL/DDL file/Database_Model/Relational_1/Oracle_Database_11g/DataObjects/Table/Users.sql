CREATE TABLE users (
    userid      INTEGER NOT NULL,
    name        NVARCHAR2(100) NOT NULL,
    surname     NVARCHAR2(100) NOT NULL,
    email       NVARCHAR2(255) NOT NULL,
    phonenumber NVARCHAR2(15) NOT NULL,
    password    NVARCHAR2(1) NOT NULL,
    createdat   TIMESTAMP NOT NULL,
    updatedat   TIMESTAMP NOT NULL,
    isactive    CHAR(1) NOT NULL
);