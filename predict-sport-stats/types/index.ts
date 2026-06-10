// Types pour l'API Backend

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface APIResponse<T> {
  data: T[];
  metadata: Record<string, any>;
  count: number;
}

export interface JWTTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
