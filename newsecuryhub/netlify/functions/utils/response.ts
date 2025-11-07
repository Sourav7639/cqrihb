import type { HandlerResponse } from '@netlify/functions';

export function jsonResponse(statusCode: number, body: unknown): HandlerResponse {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
}
