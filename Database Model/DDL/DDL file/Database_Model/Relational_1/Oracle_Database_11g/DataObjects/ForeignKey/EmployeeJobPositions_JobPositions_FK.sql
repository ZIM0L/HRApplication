--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE employeejobpositions
    ADD CONSTRAINT employeejobpositions_jobpositions_fk FOREIGN KEY ( jobpositions_jobpositionid )
        REFERENCES jobpositions ( jobpositionid );