--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE usertrainingprogress
    ADD CONSTRAINT usertrainingprogress_trainings_fk FOREIGN KEY ( trainings_trainingid )
        REFERENCES trainings ( trainingid );