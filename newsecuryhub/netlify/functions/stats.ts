import type { Handler } from '@netlify/functions';
import { jsonResponse } from './utils/response';
import { getServiceSupabase } from './utils/supabaseClient';

export const handler: Handler = async () => {
  try {
    const client = getServiceSupabase();
    const [{ count: users }, { count: programs }, { count: submissions }] = await Promise.all([
      client.from('users').select('*', { count: 'exact', head: true }),
      client.from('programs').select('*', { count: 'exact', head: true }),
      client.from('submissions').select('*', { count: 'exact', head: true })
    ]);

    return jsonResponse(200, {
      users,
      programs,
      submissions
    });
  } catch (error) {
    return jsonResponse(500, { message: (error as Error).message });
  }
};
