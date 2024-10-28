DECLARE
    PRAGMA autonomous_transaction;
BEGIN
    ords.enable_object(p_enabled => FALSE, p_object => 'Contracts', p_object_type => 'TABLE', p_object_alias => 'contracts', p_auto_rest_auth => FALSE
    );

    COMMIT;
END;