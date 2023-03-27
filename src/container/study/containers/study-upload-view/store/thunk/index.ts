
// import { ThunkActionTypes } from '../../../../../../core/store/thunk/types';

// import { defaultListBodyPart } from '../../constants/study_upload.constants';
// import { getImageName, isEmpty } from '../../../../../../core/libs/utils';
// import { store } from '../../../../../../core/store';
// import { setShowSuggestion } from '../reducer/action';
// import { CameraConfig } from '../../study-camera-config';
// import { updateLocalSubject } from '../../../study-subject-list/store/reducer/action';
// import { fileHelper } from '../../../../../../core/libs/file-helper';
// import { StudyAppBodyRegionModel, SubjectModel } from '../../../../../../container/study/models/subject/subject.model';
// import { VisitParamModel } from '../../../../../../container/study/models/subject/visit.param.model';
// import { PayloadService } from '../../../../../../container/study/services/study-payload.service';
// import { PredictParamModel } from '../../../../../../container/study/models/subject/predict-param.model';
// import { StateUpload } from '../../../../../../container/study/constants/study-constants';

// export const onThunkVerifyShowSuggestionModal =
//   (isShowModal: boolean): ThunkActionTypes =>
//   async (dispatch) => {
//     dispatch(setShowSuggestion(isShowModal));
//   };
// export const onThunkCreateVisitForUpload =
//   (
//     currentSubject: SubjectModel,
//     onCreateDone?: (visitDiagnosticId: string, subjectId?: string) => void,
//     onCreateFail?: (message: string) => void,
//     isCreateSubject?: boolean,
//     notes?: string,
//   ): ThunkActionTypes =>
//   async (dispatch) => {
//     try {
//       const param = new VisitParamModel(
//         currentSubject.patientId,
//         currentSubject.clinicalStudyId,
//         isCreateSubject ?? false,
//         currentSubject.siteName,
//         notes,
//       );
//       console.log('VisisParamModel', param);
//       const resultVisit = await PayloadService.instance.createVisitRequest(
//         param,
//       );
//       console.log('resultVisit', resultVisit);
//       if (resultVisit.success) {
//         onCreateDone &&
//           onCreateDone(
//             resultVisit.data.visitDiagnosticId,
//             isCreateSubject ? resultVisit.data?.subjectId : undefined,
//           );
//       } else {
//         if (resultVisit.errorCode === 'CreateSubject.Notfound') {
//           dispatch(
//             onThunkCreateVisitForUpload(
//               currentSubject,
//               onCreateDone,
//               onCreateFail,
//               true,
//             ),
//           );
//         } else {
//           onCreateFail && onCreateFail(resultVisit.errorCode ?? '');
//         }
//       }
//     } catch (error: any) {
//       onCreateFail && onCreateFail(error.toString());
//     }
//   };

// export const onThunkUploadImageOnSubject =
//   (
//     currentSubject: SubjectModel,
//     modelRequest?: StudyAppBodyRegionModel,
//     onStatusUpload?: (item: StudyAppBodyRegionModel) => void,
//     onFail?: (e: any) => void,
//   ): ThunkActionTypes =>
//   async (dispatch) => {
//     if (modelRequest != null) {
//       // const path = await fileHelper.getCacheFilePath(
//       //   modelRequest.bodyPart,
//       //   currentSubject?.patientId ?? '',
//       //   true,
//       // );
//       //  console.log('ddddd', modelRequest);
//       if (await CameraConfig.checkFileCached(true)) {
//         console.log('----------', await CameraConfig.checkFileCached(true));
//         const valueImage = await CameraConfig.getCachedFile(
//           currentSubject?.patientId ?? '',
//           modelRequest.bodyPart.toString(),
//           false,
//           true,
//           true,
//         );
//         await fileHelper.saveBase64ImageForStudy(
//           currentSubject?.patientId ?? '',
//           modelRequest.bodyPart,
//           false,
//           valueImage,
//         );
//         try {
//           const data = await PayloadService.instance.getInfoBodyPath(
//             modelRequest,
//             currentSubject.patientId ?? '',
//             false,
//           );
//           const paramPredict = new PredictParamModel(
//             data.path,
//             data.nameImage,
//             modelRequest.visitDiagnosticId,
//           );
//           console.log('paramPredict paramPredict', paramPredict);
//           const resultPredict = await PayloadService.instance.predictsRequest(
//             paramPredict,
//           );
//           console.log('resultPredict resultPredict', resultPredict);
//           if (resultPredict.success) {
//             modelRequest.stateBodyPart = StateUpload.UploadDone;
//             fileHelper
//               .removeCachedFiles(
//                 `${currentSubject.patientId}/${getImageName(
//                   modelRequest.bodyPart,
//                 )}`,
//               )
//               .then(() => {
//                 __DEV__ &&
//                   console.log(
//                     `remove ori file done ${
//                       currentSubject.patientId
//                     }/${getImageName(modelRequest.bodyPart)}`,
//                   );
//               });
//             onStatusUpload && onStatusUpload(modelRequest);
//           } else {
//             modelRequest.stateBodyPart = StateUpload.UploadFail;
//             fileHelper
//               .removeCachedFiles(
//                 `${currentSubject.patientId}/${getImageName(
//                   modelRequest.bodyPart,
//                 )}`,
//               )
//               .then(() => {
//                 __DEV__ &&
//                   console.log(
//                     `remove ori file done ${
//                       currentSubject.patientId
//                     }/${getImageName(modelRequest.bodyPart)}`,
//                   );
//               });
//             onStatusUpload && onStatusUpload(modelRequest);
//           }
//         } catch (error: any) {
//           modelRequest.stateBodyPart = StateUpload.UploadFail;

//           fileHelper
//             .removeCachedFiles(
//               `${currentSubject.patientId}/${getImageName(
//                 modelRequest.bodyPart,
//               )}`,
//             )
//             .then(() => {
//               __DEV__ &&
//                 console.log(
//                   `remove ori file done ${
//                     currentSubject.patientId
//                   }/${getImageName(modelRequest.bodyPart)}`,
//                 );
//             });
//           onFail && onFail(error.toString());
//           // onStatusUpload && onStatusUpload(modelRequest);
//         }
//       } else {
//         onFail && onFail('file not found');
//       }
//     }
//   };

// export const onThunkUpDateSubject =
//   (subject: SubjectModel): ThunkActionTypes =>
//   async (dispatch) => {
//     dispatch(updateLocalSubject(subject));
//   };

// export const onThunkGetAllImageForSubject =
//   (
//     subjectId?: string,
//     isThunk: boolean = true,
//     currentStatus?: number,
//     onLoadDone?: (
//       list: StudyAppBodyRegionModel[],
//       isShowSuggestMod: boolean,
//     ) => void,
//   ): ThunkActionTypes =>
//   async (dispatch) => {
//     const { isShow } = store.getState().isShowSuggestion;
//     try {
//       const listData = await PayloadService.instance.getAllImageOfSubject(
//         subjectId ?? '',
//         isThunk,
//       );
//       // console.log('aaa', listData);
//       const listEmptyPart = listData.filter((item) => isEmpty(item.imageValue));
//       if (listEmptyPart.length > 0) {
//         onLoadDone && onLoadDone(listData, isShow ?? true);
//       } else {
//         // if (currentStatus === 1) {
//         // CameraConfig.deleteCachedFiles(subjectId);
//         // await fileHelper.removeCachedFiles(subjectId);
//         //   dispatch(
//         //     onThunkGetAllImageForSubject(
//         //       subjectId,
//         //       isThunk,
//         //       currentStatus,
//         //       onLoadDone,
//         //     ),
//         //   );
//         // } else {
//         // onLoadDone && onLoadDone(listData, false);
//         // }
//         onLoadDone && onLoadDone(listData, false);
//       }
//     } catch (error) {
//       onLoadDone && onLoadDone(defaultListBodyPart, false);
//     }
//   };
