import {
  AllPatientsParam,
  AllSiteParam,
  SubjectModel,
} from '../models/subject/subject.model';
import ApiStudyService, { TypeBaseUrlEnum } from './study-api.service';
import { PatientStatusEnum } from '../constants/study-constants';
import { dateToYYYYmmDDFormatter } from '../../../core/libs/formatters';
import { ConfigServiceAddress } from '../models/config-service-url';
import { ApiResult } from '../models/api-result';
import { store } from '../../../core/store';

export class SubjectService extends ApiStudyService {
  public static instance(configService: ConfigServiceAddress){
    return new SubjectService(configService);
  };
  private constructor(configService: ConfigServiceAddress) {
    super(configService);
  }
  public getAllSubject(params?: AllPatientsParam) {
    console.log(params);
    var body = {
      ClinicalStudyIds: params?.clinicalStudyIds,
      fromDate: params?.fromDate,
      keyword: params?.keyword,
      length: params?.length,
      siteName: params?.siteName?.toString(),
      skinModuleType: params?.skinModuleType,
      start: params?.start,
    };
    const url: string =
      this.getBaseUrl(TypeBaseUrlEnum.ANALYTIC) +
      '/clinical-studies/get-all-patients';
    return this.apiPost<ApiResult>(url, body, {}, true, true);
  }
  // START - API all study
  public getAllStudyForUser() {
    const url =
      this.getBaseUrl(TypeBaseUrlEnum.ANALYTIC) + '/users/get-user-info';
    return this.apiGet<ApiResult>(url, {}, true, true);
  }
  // START - API all site
  public getAllSiteForUser(params: AllSiteParam) {
    var url =
      this.getBaseUrl(TypeBaseUrlEnum.ORG) +
      '/api/getUserInfo/' +
      params.username;
    return this.apiGet<ApiResult>(url, {}, true, false);
  }
  // START - add new subject
  public addNewSubject(params?: SubjectModel, isCreateVisit?: boolean) {
    const visitDate = dateToYYYYmmDDFormatter(new Date());
    var body = {
      id: '',
      clinicalStudyId: params?.clinicalStudyId,
      isCreateSubject: true,
      visitDate: visitDate,
      isCreateVisit: isCreateVisit ?? false,
      isActive: 1,
      patientId: params?.patientId,
      subject: params?.patientId,
      siteName: params?.siteName,
      subjectId: params?.patientId,
      email: params?.email ?? '',
      name: params?.name,
      phone: params?.phone,
    };
    console.log(body);
    var url =
      this.getBaseUrl(TypeBaseUrlEnum.ANALYTIC) +
      `/clinical-studies/${params?.clinicalStudyId}/subject`;
    return this.apiPost<ApiResult>(url, body, {}, true, false);
  }
  public checkSubjectsExistOff() {
    const { subjects } = store.getState().studyMiniApp;
    const listSubjectOffline = subjects.filter(
      (item) => item.patientStatus === PatientStatusEnum.Offline,
    );
    return listSubjectOffline.length > 0;
  }
}
