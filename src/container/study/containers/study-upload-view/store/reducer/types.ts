export interface VisibleModalSuggestionState {
  isShow: boolean | undefined;
}

export const SET_SHOW_Suggestion_MOD = 'SET_SHOW_Suggestion_MOD';
export const CLEAR_SHOW_Suggestion_MOD = 'CLEAR_SHOW_Suggestion_MOD';

export interface setShowModalSuggestion {
  type: typeof SET_SHOW_Suggestion_MOD;
  payload: boolean | undefined;
}
export interface clearShowModalSuggestion {
  type: typeof CLEAR_SHOW_Suggestion_MOD;
}

export type VisibleModalSuggestionType =
  | setShowModalSuggestion
  | clearShowModalSuggestion;
