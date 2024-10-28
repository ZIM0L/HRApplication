ALTER TABLE users ADD CONSTRAINT users_pk PRIMARY KEY ( userid );

ALTER TABLE users ADD CONSTRAINT users_email_un UNIQUE ( email );