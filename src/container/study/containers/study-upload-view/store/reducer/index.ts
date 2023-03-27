import {
  CLEAR_SHOW_Suggestion_MOD,
  SET_SHOW_Suggestion_MOD,
  VisibleModalSuggestionState,
  VisibleModalSuggestionType,
} from './types';

const initialState: VisibleModalSuggestionState = {
  isShow: undefined,
};

export const showSuggestionModReducer = (
  state = initialState,
  action: VisibleModalSuggestionType,
): VisibleModalSuggestionState => {
  switch (action.type) {
    case SET_SHOW_Suggestion_MOD:
      return {
        ...state,
        isShow: action.payload,
      };
    case CLEAR_SHOW_Suggestion_MOD:
      return {
        ...state,
        isShow: undefined,
      };
    default: {
      return state;
    }
  }
};
