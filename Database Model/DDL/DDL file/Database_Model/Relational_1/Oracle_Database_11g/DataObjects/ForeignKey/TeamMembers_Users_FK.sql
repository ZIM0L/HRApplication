ALTER TABLE teammembers
    ADD CONSTRAINT teammembers_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid );