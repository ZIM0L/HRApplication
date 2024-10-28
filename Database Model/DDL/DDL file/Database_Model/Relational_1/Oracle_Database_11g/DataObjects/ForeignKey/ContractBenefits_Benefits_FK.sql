ALTER TABLE contractbenefits
    ADD CONSTRAINT contractbenefits_benefits_fk FOREIGN KEY ( benefits_benefitid )
        REFERENCES benefits ( benefitid );