DROP FUNCTION IF EXISTS promote_user_to_admin(text);

CREATE OR REPLACE FUNCTION promote_user_to_admin(target_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
  caller_admin boolean;
  any_admin boolean;
BEGIN
  SELECT is_admin INTO caller_admin FROM profiles WHERE id = auth.uid();
  SELECT EXISTS (SELECT 1 FROM profiles WHERE is_admin = true) INTO any_admin;

  IF any_admin AND caller_admin IS NOT TRUE THEN
    RAISE EXCEPTION 'Admin privileges required';
  END IF;

  SELECT id INTO target_user_id FROM profiles WHERE lower(email) = lower(target_email);
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  UPDATE profiles
  SET is_admin = true, updated_at = now()
  WHERE id = target_user_id AND is_admin = false;

  INSERT INTO admin_audit_log (admin_id, action, table_name, record_id, new_data)
  VALUES (
    COALESCE(auth.uid(), target_user_id),
    CASE WHEN any_admin THEN 'PROMOTE_TO_ADMIN' ELSE 'BOOTSTRAP_PROMOTE_TO_ADMIN' END,
    'profiles',
    target_user_id,
    jsonb_build_object('email', target_email, 'is_admin', true)
  );

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION demote_user_from_admin(target_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
  caller_admin boolean;
BEGIN
  SELECT is_admin INTO caller_admin FROM profiles WHERE id = auth.uid();
  IF caller_admin IS NOT TRUE THEN
    RAISE EXCEPTION 'Admin privileges required';
  END IF;

  SELECT id INTO target_user_id FROM profiles WHERE lower(email) = lower(target_email);
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  UPDATE profiles
  SET is_admin = false, updated_at = now()
  WHERE id = target_user_id AND is_admin = true;

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

SELECT promote_user_to_admin('template.agency.xyz@gmail.com'::text) AS result;

SELECT id, email, is_admin FROM profiles WHERE lower(email) = lower('template.agency.xyz@gmail.com');