// Describing the shape of the app's slice of state
export interface RemoteConfigState {
  configValue?: string;
}

// Describing the different ACTION NAMES available
export const SET_DEFAULT_CONFIG = 'SET_DEFAULT_CONFIG';

export interface setDefaultConfigAction {
  type: typeof SET_DEFAULT_CONFIG;
  payload: string;
}

export type RemoteConfigActionTypes = setDefaultConfigAction;
