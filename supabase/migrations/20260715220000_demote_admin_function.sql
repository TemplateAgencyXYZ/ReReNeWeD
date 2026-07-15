CREATE OR REPLACE FUNCTION demote_user_from_admin(target_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  SELECT id INTO target_user_id FROM profiles WHERE lower(email) = lower(target_email);

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  UPDATE profiles
  SET is_admin = false, updated_at = now()
  WHERE id = target_user_id
    AND is_admin = true;

  INSERT INTO admin_audit_log (admin_id, action, table_name, record_id, new_data)
  VALUES (
    auth.uid(),
    'DEMOTE_FROM_ADMIN',
    'profiles',
    target_user_id,
    jsonb_build_object('email', target_email, 'is_admin', false)
  );

  RETURN true;
END;
$$;