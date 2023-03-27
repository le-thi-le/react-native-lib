import { SiteModel, StudyModel, SubjectModel } from '../../../../../../container/study/models/subject/subject.model';
import {
  addSubject,
  ADD_SUBJECT,
  clearDataStudy,
  CLEAR_DATA_STUDY_MOD,
  getSites,
  getStudies,
  getSubject,
  GET_SITES,
  GET_STUDIES,
  GET_SUBJECT,
  updateSubject,
  UPDATE_SUBJECT,
} from './types';

export const getAllSubject = (payload: SubjectModel[]): getSubject => ({
  type: GET_SUBJECT,
  payload,
});

export const getAllStudy = (payload: StudyModel[]): getStudies => ({
  type: GET_STUDIES,
  payload,
});

export const getAllSite = (payload: SiteModel[]): getSites => ({
  type: GET_SITES,
  payload,
});
export const updateLocalSubject = (payload: any): updateSubject => ({
  type: UPDATE_SUBJECT,
  payload,
});
export const addLocalSubject = (payload: any): addSubject => ({
  type: ADD_SUBJECT,
  payload,
});
export const clearDataStudyMod = (): clearDataStudy => ({
  type: CLEAR_DATA_STUDY_MOD,
});
