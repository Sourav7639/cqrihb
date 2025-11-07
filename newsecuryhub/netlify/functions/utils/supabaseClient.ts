import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

export function getServiceSupabase() {
  if (!url || !serviceRoleKey) {
    throw new Error('Supabase environment variables are not configured.');
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false
    }
  });
}
