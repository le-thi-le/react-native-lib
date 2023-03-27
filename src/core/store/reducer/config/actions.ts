import { setDefaultConfigAction, SET_DEFAULT_CONFIG } from './types';

export const onSetConfigToLocal = (
  payload: string,
): setDefaultConfigAction => ({
  type: SET_DEFAULT_CONFIG,
  payload,
});
