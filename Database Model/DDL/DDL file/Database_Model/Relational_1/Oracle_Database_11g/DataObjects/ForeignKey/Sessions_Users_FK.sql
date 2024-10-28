ALTER TABLE sessions
    ADD CONSTRAINT sessions_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid );