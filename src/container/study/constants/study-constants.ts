export enum BodyPartEnum {
  UpperFront = 0,
  UpperBack = 1,
  LowerFront = 2,
  LowerBack = 3,
}

export enum TypeLoadUploadMiniAppEnum {
  Preview,
  Camera,
}
export enum StudyMiniAppParam {
  BodyPart = 'bodyPath',
  SubjectParam = 'subjectParam',
  VisitDetail = 'visitParam',
  VisitView = 'visitView',
  Easi = 'easi',
  ListBodyPart = 'listBodyPart',
  RollBack = 'rollback',
}
export enum StudyMiniAppTypeDDLEnum {
  Study = 'study',
  Site = 'site',
}
export enum StudyMiniAppTypeAddSubEnum {
  Save = 'Save',
  SaveAndContinue = 'SaveAndContinue',
}
export enum StateUpload {
  NoneUpload,
  Uploading,
  UploadDone,
  UploadFail,
  Offline,
}
export enum PatientStatusEnum {
  NoneUpload = -1,
  UploadFail = 0,
  UploadDone = 1,
  Offline = 4,
  CannotCreate = 3,
}
export enum PreViewState {
  NonePreview,
  Loading,
  PreviewDone,
  PreviewFail,
}
