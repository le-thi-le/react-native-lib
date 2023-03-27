
import { isEmpty } from '../../../../core/libs/utils';
import {
  BodyPartEnum,
  PreViewState,
  StateUpload,
  TypeLoadUploadMiniAppEnum,
} from '../../constants/study-constants';

export class SubjectModel {
  id: any; //null = created offline, not null = created online
  patientId: string;
  status?: string; //not use for now
  updatedAt?: string;
  clinicalStudyId: string;
  createdAt: string;
  email?: string;
  isActive: number;
  name?: string;
  patientStatus: number; // -1 nothing (no photo taken), 0 - upload failed (4 photo + have not uploaded all), 1 - success (uploaded 4 photo successfully), 3 - offline( partly uploaded = 4 photo, have not uploaded all photo), 4 - partly shoot (<4 photo taken, have not uploaded)
  // syncStatus?: boolean; // true = updated by data from API, fasle = not updated by data from API
  phone?: string;
  siteName?: string;
  todayVisitUploadedAt: string;
  image?: ImageModel[];
  visitDiagnosticId?: string;
  notes: string;
  constructor() {
    this.id = '';
    this.patientId = '';
    this.status = '';
    this.updatedAt = '';
    this.clinicalStudyId = '';
    this.createdAt = '';
    this.isActive = 1;
    this.patientStatus = -1;
    this.todayVisitUploadedAt = '';
    this.image = [];
    this.notes = '';
    // this.syncStatus = false;
  }
}
export class SubjectResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  items: SubjectModel[];
  constructor() {
    this.pageNumber = 0;
    this.pageSize = 0;
    this.totalItems = 0;
    this.totalPages = 0;
    this.items = [];
  }
}

export class AllPatientsParam {
  clinicalStudyIds: any[];
  fromDate: string;
  keyword: string;
  length: number;
  siteName: string;
  skinModuleType: string;
  start: number;
  constructor(
    clinicalStudyIds: any[],
    fromDate: string,
    keyword: string,
    length: number,
    siteName: string,
    skinModuleType: string,
    start: number,
  ) {
    this.clinicalStudyIds = clinicalStudyIds;
    this.fromDate = fromDate;
    this.keyword = keyword;
    this.length = length;
    this.siteName = siteName;
    this.skinModuleType = skinModuleType;
    this.start = start;
  }
  // copyWith = (clinicalStudyIds?: any[], siteName?: string, start?: number) => {
  //   return new AllPatientsParam(
  //     clinicalStudyIds ?? this.clinicalStudyIds,
  //     this.fromDate,
  //     this.keyword,
  //     this.length,
  //     siteName ?? this.siteName,
  //     this.skinModuleType,
  //     start ?? this.start,
  //   );
  // };
}
export class ImageModel {
  path: string;
  nameImage: string;
  bodyPart?: number;
  status: StateUpload = StateUpload.NoneUpload;
  visitDiagnosticId?: string;
  constructor(bodyPart: number, path?: string, status?: StateUpload) {
    this.path = path ?? '';
    this.status = status ?? StateUpload.NoneUpload;
    this.bodyPart = bodyPart;
    this.nameImage = this.getImageName(bodyPart);
  }
  private getImageName = (bodyPart: number) => {
    switch (bodyPart) {
      case BodyPartEnum.UpperFront:
        return 'Upper Front.jpg';
      case BodyPartEnum.LowerFront:
        return 'Lower Front.jpg';
      case BodyPartEnum.UpperBack:
        return 'Upper Back.jpg';
      default:
        return 'Lower Back.jpg';
    }
  };
}
export class AllSiteParam {
  username: string;
  constructor() {
    this.username = '';
  }
}
export class UserResponse {
  id: string;
  userName: string;
  fullName: string;
  firstName: string;
  phoneNumber: string;
  siteName: string;
  lastName: string;
  email: string;
  roleId: string;
  role: string;
  orgName: string;
  isActive: boolean;
  skinModules: SkinModule[];
  constructor() {
    this.email = '';
    this.userName = '';
    this.id = '';
    this.fullName = '';
    this.firstName = '';
    this.phoneNumber = '';
    this.siteName = '';
    this.lastName = '';
    this.roleId = '';
    this.role = '';
    this.orgName = '';
    this.isActive = false;
    this.skinModules = [];
  }
}

export class SkinModule {
  moduleId: string;
  moduleName: string;
  clinicalStudies: StudyModel[];
  constructor() {
    this.clinicalStudies = [];
    this.moduleId = '';
    this.moduleName = '';
  }
}

export class StudyModel {
  clinicalStudyId: string;
  clinicalStudyName: string;
  totalSubject: number;
  countSubject: number;
  unlimited: boolean;
  constructor() {
    this.clinicalStudyId = '';
    this.clinicalStudyName = '';
    this.totalSubject = 0;
    this.countSubject = 0;
    this.unlimited = false;
  }
}
export class UserInfoModel {
  AvatarUrl: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  UserName: string;
  orgRoleList: OrgRoleList[];
  constructor() {
    this.AvatarUrl = '';
    this.Email = '';
    this.FirstName = '';
    this.LastName = '';
    this.PhoneNumber = '';
    this.UserName = '';
    this.orgRoleList = [];
  }
}

export class OrgRoleList {
  Org: string;
  app: string[];
  moduleAccess: string[];
  role: string;
  site: SiteModel[];
  constructor() {
    this.Org = '';
    this.app = [];
    this.moduleAccess = [];
    this.role = '';
    this.site = [];
  }
}

export class SiteModel {
  id: number;
  name: string;
  constructor() {
    this.id = 0;
    this.name = '';
  }
}
export class SubjectParam {
  valueSite?: string;
  valueStudy?: string;
  constructor(valueSite?: string, valueStudy?: string) {
    this.valueSite = valueSite;
    this.valueStudy = valueStudy;
  }
}

export class StudyAppBodyRegionModel {
  bodyPart: number;
  imageValue?: string;
  nameImage: string;
  path?: string;
  stateBodyPart: StateUpload = StateUpload.NoneUpload;
  messageUploadFail?: string;
  previewState: PreViewState = PreViewState.NonePreview;
  visitDiagnosticId?: string;
  constructor(
    bodyPart: number,
    imageValue?: string,
    visitDiagnosticId?: string,
  ) {
    this.bodyPart = bodyPart;
    this.imageValue = imageValue;
    this.nameImage = this.getImageName(bodyPart);
    this.visitDiagnosticId = visitDiagnosticId;
  }
  getTypeUpload = () => {
    return isEmpty(this.imageValue)
      ? TypeLoadUploadMiniAppEnum.Camera
      : TypeLoadUploadMiniAppEnum.Preview;
  };
  private getImageName = (bodyPart: number) => {
    switch (bodyPart) {
      case BodyPartEnum.UpperFront:
        return 'Upper Front.jpg';
      case BodyPartEnum.LowerFront:
        return 'Lower Front.jpg';
      case BodyPartEnum.UpperBack:
        return 'Upper Back.jpg';
      default:
        return 'Lower Back.jpg';
    }
  };
}
