import { combineReducers } from 'redux';
import { setTokenAIReducer } from '../../../container/study/containers/study-preview/store/reducer';
import { subjectReducer } from '../../../container/study/containers/study-subject-list/store/reducer';
import { showSuggestionModReducer } from '../../../container/study/containers/study-upload-view/store/reducer';


export const rootReducer = combineReducers({
  studyMiniApp: subjectReducer,
  tokenAI: setTokenAIReducer,
  isShowSuggestion: showSuggestionModReducer,
});
