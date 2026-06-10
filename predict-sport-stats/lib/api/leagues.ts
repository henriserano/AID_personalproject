// API Leagues

import { fetchWithAuth } from './auth';
import type { League, APIResponse } from '@/types';

export async function getLeagues(): Promise<APIResponse<League>> {
  return fetchWithAuth<APIResponse<League>>('/api/v1/leagues');
}
