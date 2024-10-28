ALTER TABLE leaverequest
    ADD CONSTRAINT leaverequest_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid );