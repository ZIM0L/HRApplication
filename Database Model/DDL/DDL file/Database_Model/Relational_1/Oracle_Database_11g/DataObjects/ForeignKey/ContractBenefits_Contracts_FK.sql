ALTER TABLE contractbenefits
    ADD CONSTRAINT contractbenefits_contracts_fk FOREIGN KEY ( contracts_contractid )
        REFERENCES contracts ( contractid );