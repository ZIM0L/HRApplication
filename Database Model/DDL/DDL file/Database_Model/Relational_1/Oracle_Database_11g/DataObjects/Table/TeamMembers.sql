CREATE TABLE teammembers (
    teammemberid INTEGER NOT NULL,
    users_userid INTEGER NOT NULL,
    teams_teamid INTEGER NOT NULL,
    joinedat     TIMESTAMP NOT NULL,
    leftat       TIMESTAMP,
    userid       INTEGER NOT NULL
);