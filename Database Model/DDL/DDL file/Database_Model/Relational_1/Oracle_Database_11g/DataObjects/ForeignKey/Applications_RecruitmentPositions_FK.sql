--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE applications
    ADD CONSTRAINT applications_recruitmentpositions_fk FOREIGN KEY ( recruitmentpositions_positionid )
        REFERENCES recruitmentpositions ( positionid );