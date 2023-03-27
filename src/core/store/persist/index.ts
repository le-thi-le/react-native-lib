import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export const PERSIST_CONFIG: any = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: [],
  whitelist: [
    'session',
    'setting',
    'dataWarehouse',
    'profile',
    'studyMiniApp',
    'remoteConfig',
    'isShowSuggestion',
  ], // save specific reducers
  blacklist: [], // don't save specific reducers
  stateReconciler: autoMergeLevel2,
};
