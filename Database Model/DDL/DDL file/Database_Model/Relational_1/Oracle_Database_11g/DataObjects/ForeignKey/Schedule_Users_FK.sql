ALTER TABLE schedule
    ADD CONSTRAINT schedule_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid )
            ON DELETE CASCADE;