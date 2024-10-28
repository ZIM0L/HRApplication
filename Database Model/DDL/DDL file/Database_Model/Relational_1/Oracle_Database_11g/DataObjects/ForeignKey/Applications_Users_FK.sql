ALTER TABLE applications
    ADD CONSTRAINT applications_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid );