ALTER TABLE usertrainingprogress
    ADD CONSTRAINT usertrainingprogress_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid );