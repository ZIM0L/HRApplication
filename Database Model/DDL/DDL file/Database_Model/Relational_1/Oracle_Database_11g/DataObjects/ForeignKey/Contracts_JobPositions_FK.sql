ALTER TABLE contracts
    ADD CONSTRAINT contracts_jobpositions_fk FOREIGN KEY ( jobpositions_jobpositionid )
        REFERENCES jobpositions ( jobpositionid );