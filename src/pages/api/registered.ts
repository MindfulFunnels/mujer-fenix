import type { APIRoute } from 'astro';
import { getUsers } from '../../db/client';


export const GET: APIRoute = async () => {
  const result = await getUsers();
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};