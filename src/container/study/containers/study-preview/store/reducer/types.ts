export interface TokenAIState {
  accessToken?: string;
}

export const SET_ACCESS_TOKEN_AI = 'SET_ACCESS_TOKEN_AI';
export const CLEAR_ACCESS_TOKEN_AI = 'CLEAR_ACCESS_TOKEN_AI';

export interface setAccessTokenAI {
  type: typeof SET_ACCESS_TOKEN_AI;
  payload: string | undefined;
}
export interface clearAccessTokenAI {
  type: typeof CLEAR_ACCESS_TOKEN_AI;
}

export type TokenAIType = setAccessTokenAI | clearAccessTokenAI;
