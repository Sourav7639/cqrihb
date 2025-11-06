import type { Handler } from '@netlify/functions';
import { jsonResponse } from './utils/response';
import { getServiceSupabase } from './utils/supabaseClient';

export const handler: Handler = async (event) => {
  const id = event.path.split('/').pop();

  if (!id) {
    return jsonResponse(400, { message: 'Submission ID missing' });
  }

  if (event.httpMethod === 'PATCH') {
    try {
      const client = getServiceSupabase();
      const payload = JSON.parse(event.body || '{}');
      const { data, error } = await client.from('submissions').update(payload).eq('id', id).select();
      if (error) throw error;
      return jsonResponse(200, data);
    } catch (error) {
      return jsonResponse(500, { message: (error as Error).message });
    }
  }

  return jsonResponse(405, { message: 'Method Not Allowed' });
};
