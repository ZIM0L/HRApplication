ALTER TABLE contracts
    ADD CONSTRAINT contracts_users_fk FOREIGN KEY ( users_userid )
        REFERENCES users ( userid )
            ON DELETE CASCADE;