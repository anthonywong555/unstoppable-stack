import type { RequestHandler } from './$types';
import { getStatus } from '$lib/server/durabel-execution';

export const GET: RequestHandler = async () => {
  const status = await getStatus();
  return new Response(String(status));
};