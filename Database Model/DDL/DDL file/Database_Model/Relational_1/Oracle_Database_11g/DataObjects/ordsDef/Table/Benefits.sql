DECLARE
    PRAGMA autonomous_transaction;
BEGIN
    ords.enable_object(p_enabled => FALSE, p_object => 'Benefits', p_object_type => 'TABLE', p_object_alias => 'benefits', p_auto_rest_auth => FALSE
    );

    COMMIT;
END;