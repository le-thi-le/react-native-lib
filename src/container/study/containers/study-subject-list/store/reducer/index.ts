import {
  ADD_SUBJECT,
  CLEAR_DATA_STUDY_MOD,
  GET_SITES,
  GET_STUDIES,
  GET_SUBJECT,
  StudyActionType,
  StudyAppState,
  UPDATE_SUBJECT,
} from './types';

const initialSubjectState: StudyAppState = {
  subjects: [],
  studies: [],
  sites: [],
};

export const subjectReducer = (
  state = initialSubjectState,
  action: StudyActionType,
): StudyAppState => {
  switch (action.type) {
    case GET_SITES:
      return {
        ...state,
        sites: action.payload,
      };

    case GET_SUBJECT:
      return {
        ...state,
        subjects: action.payload,
      };
    case GET_STUDIES:
      return {
        ...state,
        studies: action.payload,
      };
    case UPDATE_SUBJECT:
      // console.log('updatedupdatedupdated', action.payload);
      return {
        ...state,
        subjects: [
          ...state.subjects.map((item) => {
            if (item.patientId === action.payload.patientId) {
              return {
                ...item,
                patientStatus: action.payload.patientStatus,
                image: action.payload.image,
              };
            }
            return item;
          }),
        ],
      };
    case ADD_SUBJECT:
      const foundMessage = state.subjects.findIndex((item) => {
        return item.patientId === action.payload.patientId;
      });

      if (foundMessage > -1) {
        return { ...state };
      }

      return {
        ...state,
        subjects: [action.payload, ...state.subjects],
      };
    case CLEAR_DATA_STUDY_MOD:
      return {
        ...state,
        subjects: [],
        sites: [],
        studies: [],
      };
    default: {
      return state;
    }
  }
};
