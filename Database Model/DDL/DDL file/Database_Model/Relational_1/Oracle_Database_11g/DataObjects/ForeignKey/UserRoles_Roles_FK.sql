ALTER TABLE userroles
    ADD CONSTRAINT userroles_roles_fk FOREIGN KEY ( roles_roleid )
        REFERENCES roles ( roleid )
            ON DELETE CASCADE;