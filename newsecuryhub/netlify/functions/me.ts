import type { Handler } from '@netlify/functions';
import { jsonResponse } from './utils/response';
import { getServiceSupabase } from './utils/supabaseClient';

export const handler: Handler = async (event) => {
  const token = event.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return jsonResponse(401, { message: 'Unauthorized' });
  }

  try {
    const client = getServiceSupabase();
    const { data, error } = await client.auth.getUser(token);
    if (error || !data.user) {
      return jsonResponse(401, { message: 'Invalid token' });
    }
    return jsonResponse(200, data.user);
  } catch (error) {
    return jsonResponse(500, { message: (error as Error).message });
  }
};
