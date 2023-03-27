import {
  PreViewState,
  StateUpload,
  TypeLoadUploadMiniAppEnum,
} from '../constants/study-constants';
import { StudyAppBodyRegionModel } from './subject/subject.model';

export class DropdownStudyItemModel {
  key: string | number;
  value: string;

  constructor() {
    this.value = '';
    this.key = '';
  }
}

export class VisitDetailParam {
  bodyPart: number;
  subjectId: string;
  type: TypeLoadUploadMiniAppEnum;
  studyId?: string;
  imageBase64?: string; // for offline
  listBodyRegion: StudyAppBodyRegionModel[];
  stateBodyPart?: StateUpload;
  messagePreviewFail?: string;
  previewState: PreViewState = PreViewState.NonePreview;
  constructor() {
    this.bodyPart = 0;
    this.subjectId = '';
    this.type = TypeLoadUploadMiniAppEnum.Camera;
    this.imageBase64 = '';
    this.listBodyRegion = [];
    this.studyId = '';
  }
}
export class ContentVisitModel {
  bodyPart: number;
  subjectId: string;
  imageBase64: string;
  constructor() {
    this.bodyPart = 0;
    this.subjectId = '';
    this.imageBase64 = '';
  }
}

export class SubjectUploadModel {
  subjectId?: string;
  studyId?: string;
  // constructor(subjectId?: string, studyId?: string) {
  //   this.studyId = studyId;
  //   this.subjectId = subjectId;
  // }
}
