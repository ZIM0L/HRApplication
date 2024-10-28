ALTER TABLE userroles
    ADD CONSTRAINT userroles_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid )
            ON DELETE CASCADE;