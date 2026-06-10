// Service d'authentification JWT

import type { JWTTokenResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_AUTH_KEY = process.env.NEXT_PUBLIC_API_AUTH_KEY!;

export async function getJWTToken(): Promise<string> {
  const response = await fetch(`${API_URL}/api/v1/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ api_key: API_AUTH_KEY }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to get JWT token');
  }

  const data: JWTTokenResponse = await response.json();
  return data.access_token;
}

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // En Server Component, on obtient toujours un nouveau token
  const token = await getJWTToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
