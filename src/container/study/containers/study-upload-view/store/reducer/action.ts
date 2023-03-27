import {
  clearShowModalSuggestion,
  CLEAR_SHOW_Suggestion_MOD,
  setShowModalSuggestion,
  SET_SHOW_Suggestion_MOD,
} from './types';

export const setShowSuggestion = (
  payload: boolean,
): setShowModalSuggestion => ({
  type: SET_SHOW_Suggestion_MOD,
  payload,
});
export const clearShowSuggestion = (): clearShowModalSuggestion => ({
  type: CLEAR_SHOW_Suggestion_MOD,
});
