DECLARE
    PRAGMA autonomous_transaction;
BEGIN
    ords.enable_object(p_enabled => FALSE, p_object => 'Attachments_Firebase', p_object_type => 'TABLE', p_object_alias => 'attachments_firebase'
    , p_auto_rest_auth => FALSE);

    COMMIT;
END;