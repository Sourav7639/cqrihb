import type { Handler } from '@netlify/functions';
import { jsonResponse } from './utils/response';
import { getServiceSupabase } from './utils/supabaseClient';

export const handler: Handler = async (event) => {
  const segments = event.path.split('/');
  const id = segments[segments.length - 2];

  if (!id) {
    return jsonResponse(400, { message: 'Program ID missing' });
  }

  if (event.httpMethod === 'GET') {
    try {
      const client = getServiceSupabase();
      const { data, error } = await client.from('submissions').select('*').eq('programId', id);
      if (error) throw error;
      return jsonResponse(200, data);
    } catch (error) {
      return jsonResponse(500, { message: (error as Error).message });
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const client = getServiceSupabase();
      const payload = JSON.parse(event.body || '{}');
      payload.programId = id;
      const { data, error } = await client.from('submissions').insert(payload).select();
      if (error) throw error;
      return jsonResponse(201, data);
    } catch (error) {
      return jsonResponse(500, { message: (error as Error).message });
    }
  }

  return jsonResponse(405, { message: 'Method Not Allowed' });
};
