CREATE TABLE usertrainingprogress (
    usertrainingid       INTEGER NOT NULL,
    progress             NUMBER NOT NULL,
    lastupdated          TIMESTAMP NOT NULL,
    trainings_trainingid INTEGER NOT NULL,
    users_userid         INTEGER NOT NULL,
    userid               INTEGER NOT NULL
);