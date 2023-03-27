import {
  CLEAR_ACCESS_TOKEN_AI,
  SET_ACCESS_TOKEN_AI,
  TokenAIType,
  TokenAIState,
} from './types';

const initialState: TokenAIState = {
  accessToken: undefined,
};

export const setTokenAIReducer = (
  state = initialState,
  action: TokenAIType,
): TokenAIState => {
  switch (action.type) {
    case SET_ACCESS_TOKEN_AI:
      return {
        ...state,
        accessToken: action.payload,
      };
    case CLEAR_ACCESS_TOKEN_AI:
      return {
        ...state,
        accessToken: undefined,
      };
    default: {
      return state;
    }
  }
};
