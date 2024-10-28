ALTER TABLE employeejobpositions
    ADD CONSTRAINT employeejobpositions_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid );