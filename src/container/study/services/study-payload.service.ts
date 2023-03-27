// import { Platform } from 'react-native';
// import { fileHelper } from '../../../core/libs/file-helper';
// import { defaultListBodyPart } from '../containers/study-upload-view/constants/study_upload.constants';
// import { CameraConfig } from '../containers/study-upload-view/study-camera-config';
// import { ApiResult } from '../models/api-result';
// import { ConfigServiceAddress } from '../models/config-service-url';
// import { PredictParamModel } from '../models/subject/predict-param.model';
// import { StudyAppBodyRegionModel } from '../models/subject/subject.model';
// import { VisitParamModel } from '../models/subject/visit.param.model';
// import ApiStudyService, {
//   AuthenTypeEnum,
//   ContentTypeEnum,
//   TypeBaseUrlEnum,
// } from './study-api.service';

// export class PayloadService extends ApiStudyService {
//   public static instance(configService: ConfigServiceAddress){
//     return new PayloadService(configService);
//   };
//   private constructor(configService: ConfigServiceAddress) {
//     super(configService);
//   }
//   async getAllImageOfSubject(subjectId: string, isThumbnail: boolean) {
//     const list: StudyAppBodyRegionModel[] = [];
//     await Promise.all(
//       defaultListBodyPart.map(async (item) => {
//         const itemResult = await this.getInfoBodyPath(
//           item,
//           subjectId,
//           isThumbnail,
//           true,
//         );
//         list.push(itemResult);
//       }),
//     );
//     return list;
//   }
//   async getInfoBodyPath(
//     item: StudyAppBodyRegionModel,
//     subjectId: string,
//     isThum: boolean,
//     isPayload?: boolean,
//   ) {
//     try {
//       const imagePath = await fileHelper.getCacheFilePath(
//         item.bodyPart,
//         subjectId,
//         isThum,
//       );
//       const result = new StudyAppBodyRegionModel(item.bodyPart);
//       if (isPayload) {
//         const valueImage = await CameraConfig.getCachedFile(
//           subjectId,
//           item.bodyPart.toString(),
//           isThum,
//           true,
//           true,
//         );
//         result.imageValue = valueImage;
//       }

//       result.path = imagePath;

//       return result;
//     } catch (error) {
//       console.log('error', error);
//       return new StudyAppBodyRegionModel(item.bodyPart, '');
//     }
//   }

//   public createVisitRequest(params?: VisitParamModel) {
//     var body = {
//       clinicalStudyId: params?.studyId,
//       isCreateSubject: params?.isCreateSubject,
//       isCreateVisit: params?.isCreateVisit,
//       subject: params?.subject,
//       visitDate: params?.visitDate,
//       siteName: params?.siteName,
//       notes: params?.notes,
//       byStudy: params?.byStudy,
//     };
//     const url: string =
//       this.getBaseUrl(TypeBaseUrlEnum.ANALYTIC) +
//       '/clinical-studies/' +
//       params?.studyId +
//       '/subject';

//     return this.apiPost<ApiResult>(url, body, {}, true);
//   }
//   public predictsRequest(params?: PredictParamModel) {
//     const data = new FormData();
//     const fullPath = (Platform.OS === 'android' ? 'file://' : '') + params?.uri;
//     data.append('File', {
//       uri: fullPath,
//       name: params?.fileName,
//       type: 'image/jpeg',
//     });
//     data.append('VisitDiagnosticId', params?.visitDiagnosticId);
//     console.log('params?.visitDiagnosticId', params?.visitDiagnosticId);
//     const url: string =
//       this.getBaseUrl(TypeBaseUrlEnum.ANALYTIC) + '/diagnostics/predicts';
//     console.log('predicts predicts uri', url);
//     return this.apiPost<ApiResult>(
//       url,
//       data,
//       {},
//       true,
//       false,
//       ContentTypeEnum.formData,
//       AuthenTypeEnum.BearerToken,
//     );
//   }
// }
