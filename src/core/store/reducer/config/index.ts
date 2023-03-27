import {
  RemoteConfigActionTypes,
  RemoteConfigState,
  SET_DEFAULT_CONFIG,
} from './types';

const initialState: RemoteConfigState = {
  configValue: undefined,
};

export const remoteConfigReducer = (
  state = initialState,
  action: RemoteConfigActionTypes,
): RemoteConfigState => {
  switch (action.type) {
    case SET_DEFAULT_CONFIG: {
      return {
        ...state,
        configValue: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
