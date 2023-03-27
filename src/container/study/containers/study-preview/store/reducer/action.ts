import {
  clearAccessTokenAI,
  CLEAR_ACCESS_TOKEN_AI,
  setAccessTokenAI,
  SET_ACCESS_TOKEN_AI,
} from './types';

export const setAccessTokenForAI = (payload?: string): setAccessTokenAI => ({
  type: SET_ACCESS_TOKEN_AI,
  payload,
});
export const clearAccessTokenForAI = (): clearAccessTokenAI => ({
  type: CLEAR_ACCESS_TOKEN_AI,
});
