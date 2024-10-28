ALTER TABLE loginhistory
    ADD CONSTRAINT loginhistory_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid );