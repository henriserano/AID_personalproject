// API Teams

import { fetchWithAuth } from './auth';
import type { Team, APIResponse } from '@/types';

export async function getTeams(): Promise<APIResponse<Team>> {
  return fetchWithAuth<APIResponse<Team>>('/api/v1/teams');
}
