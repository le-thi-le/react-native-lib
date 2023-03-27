import {
  SiteModel,
  StudyModel,
  SubjectModel,
} from '../../../../../../container/study/models/subject/subject.model';

export interface StudyAppState {
  studies: StudyModel[];
  subjects: SubjectModel[];
  sites: SiteModel[];
}

export const GET_STUDIES = 'GET_STUDIES';
export const GET_SUBJECT = 'GET_SUBJECT';
export const GET_SITES = 'GET_SITES';
export const UPDATE_SUBJECT = 'UPDATE_SUBJECT';
export const ADD_SUBJECT = 'ADD_SUBJECT';
export const CLEAR_DATA_STUDY_MOD = 'CLEAR_DATA_STUDY_MOD';
export interface getStudies {
  type: typeof GET_STUDIES;
  payload: StudyModel[];
}

export interface getSites {
  type: typeof GET_SITES;
  payload: SiteModel[];
}
export interface getSubject {
  type: typeof GET_SUBJECT;
  payload: SubjectModel[];
}
export interface updateSubject {
  type: typeof UPDATE_SUBJECT;
  payload: SubjectModel;
}

export interface addSubject {
  type: typeof ADD_SUBJECT;
  payload: SubjectModel;
}

export interface clearDataStudy {
  type: typeof CLEAR_DATA_STUDY_MOD;
}

export type StudyActionType =
  | getStudies
  | getSites
  | getSubject
  | updateSubject
  | clearDataStudy
  | addSubject;
