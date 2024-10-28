ALTER TABLE teammembers
    ADD CONSTRAINT teammembers_teams_fk FOREIGN KEY ( teams_teamid )
        REFERENCES teams ( teamid );