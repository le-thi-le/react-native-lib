// import { onSetVisibleSpinner } from '@src/core/store/reducer/app/actions';
// import { ThunkActionTypes } from '@src/core/store/thunk/types';
// import {
//   getAllSite,
//   getAllSubject,
//   getAllStudy,
//   addLocalSubject,
//   updateLocalSubject,
// } from '../reducer/action';
// import { catchHandle, handleError } from '@src/core/libs/catch-helper';
// import storage from 'redux-persist/lib/storage';
// import { store } from '@src/core/store';
// import { SubjectService } from '@src/containers/mini-apps/study/services/study-subject.service';
// import {
//   AllPatientsParam,
//   AllSiteParam,
//   ImageModel,
//   SubjectModel,
// } from '@src/containers/mini-apps/study/models/subject/subject.model';
// import { PatientStatusEnum } from '@src/containers/mini-apps/study/constants/study-constants';
// import { dateToYYYYmmDDFormatter } from '@src/core/libs/formatters';
// import { renameFile } from '@src/core/libs/file-helper';
// import RNFS from 'react-native-fs';
// import { toasts } from '@src/core/libs/toasts';

// export const onThunkGetAllStudyAndSite =
//   (
//     onSuccess?: (studyDefault?: string, siteDefault?: string) => void,
//     onFail?: (message: string) => void,
//   ): ThunkActionTypes =>
//   async (dispatch) => {
//     try {
//       dispatch(onSetVisibleSpinner(true));
//       var resultStudy = await SubjectService.instance.getAllStudyForUser();
//       if (resultStudy.success) {
//         const listAllStudy = [];
//         for (let item of resultStudy.data.skinModules) {
//           listAllStudy.push(...item.clinicalStudies);
//         }
//         dispatch(getAllStudy(listAllStudy));
//         const studyDefault =
//           listAllStudy.length === 1
//             ? listAllStudy[0].clinicalStudyId
//             : undefined;
//         const param = new AllSiteParam();
//         param.username = resultStudy.data.userName;
//         var result = await SubjectService.instance.getAllSiteForUser(param);
//         if (result.success) {
//           const listSites = [];
//           for (let item of result.data.orgRoleList) {
//             listSites.push(...item.site);
//           }
//           dispatch(getAllSite(listSites));
//           const siteDefault =
//             listSites.length === 1 ? listSites[0].id : undefined;
//           onSuccess && onSuccess(studyDefault, siteDefault);
//         } else {
//           onFail && onFail('result site' + result.message ?? '');
//           handleError(result, dispatch, () => {});
//         }
//       } else {
//         onFail && onFail('resultStudy ' + resultStudy.message ?? '');
//         handleError(resultStudy, dispatch, () => {});
//       }
//     } catch (e: any) {
//       catchHandle(e, dispatch);
//       onFail && onFail('onThunkGetAllStudy' + e.toString());
//     }
//     dispatch(onSetVisibleSpinner(false));
//   };
// export const onThunkGetAllSubjects =
//   (
//     onSuccess?: (data: any) => void,
//     onFail?: (message: string) => void,
//     param?: AllPatientsParam,
//     isOffline?: boolean,
//   ): ThunkActionTypes =>
//   async (dispatch) => {
//     try {
//       var subjectResult = await SubjectService.instance.getAllSubject(param);
//       if (subjectResult.success === true) {
//         onSuccess && onSuccess(subjectResult.data.items);
//       } else {
//         onFail && onFail(subjectResult.message ?? '');
//         handleError(subjectResult, dispatch, () => {});
//       }
//     } catch (e: any) {
//       // const { subjects } = store.getState().studyMiniApp;
//       // toasts.warning('Network error => You are currently offline');
//       catchHandle(e, dispatch);
//       onFail && onFail(e);
//     }
//   };
// export const onThunkAddNewSubject =
//   (
//     onSuccess?: (data?: any, subject?: SubjectModel) => void,
//     onFail?: (message: string, subject?: SubjectModel) => void,
//     param: SubjectModel = new SubjectModel(),
//     isCreateVisit?: boolean,
//     listSubjectCurrent?: SubjectModel[],
//   ): ThunkActionTypes =>
//   async (dispatch) => {
//     try {
//       dispatch(onSetVisibleSpinner(true));
//       var subjectResult = await SubjectService.instance.addNewSubject(
//         param,
//         isCreateVisit,
//       );
//       if (subjectResult.success === true) {
//         const body = {
//           id: subjectResult.data?.subjectId ?? '',
//           clinicalStudyId: param?.clinicalStudyId,
//           isCreateSubject: true,
//           visitDate: dateToYYYYmmDDFormatter(new Date()),
//           isCreateVisit: false,
//           isActive: 1,
//           patientId: param?.patientId,
//           subject: param?.patientId,
//           siteName: param?.siteName,
//           subjectId: param?.patientId,
//           email: param?.email ?? '',
//           name: param?.name ?? '',
//           phone: param?.phone ?? '',
//           patientStatus: PatientStatusEnum.NoneUpload,
//         };
//         console.log('subjectResult.data', body);

//         dispatch(addLocalSubject(body));
//         onSuccess && onSuccess(subjectResult?.data, body);
//       } else {
//         // handleError(subjectResult, dispatch, () => {});
//         if (
//           subjectResult.errorCode === 'CreateSubject.SubjectExisted' &&
//           listSubjectCurrent
//         ) {
//           // const index=
//           await renameFile(param.patientId, param.patientId + '(1)');
//           param.patientId = param.patientId + '(1)';
//           if (param.image) {
//             var newImage: ImageModel[] = [];
//             param?.image.forEach((e) => {
//               e.path = `${RNFS.DocumentDirectoryPath}/Photos/${param.patientId}/${e.bodyPart}.JPG`;
//               newImage.push(e);
//             });
//             param.image = newImage;
//             console.log('newImagenewImage', newImage);
//           }
//           dispatch(
//             updateLocalSubject(
//               listSubjectCurrent.splice(
//                 listSubjectCurrent.findIndex(
//                   (item) =>
//                     item.patientId === param.patientId && item.id === '',
//                 ),
//                 1,
//                 param,
//               ),
//             ),
//           );
//           dispatch(
//             onThunkAddNewSubject(
//               onSuccess,
//               onFail,
//               param,
//               isCreateVisit,
//               listSubjectCurrent,
//             ),
//           );
//         }
//         onFail && onFail(subjectResult.errorCode ?? '');
//       }
//     } catch (e: any) {
//       // catchHandle(e, dispatch);
//       if (e.toString().includes('Network Error')) {
//         const body = {
//           id: '',
//           clinicalStudyId: param?.clinicalStudyId,
//           isCreateSubject: true,
//           visitDate: dateToYYYYmmDDFormatter(new Date()),
//           isCreateVisit: false,
//           isActive: 1,
//           patientId: param?.patientId,
//           subject: param?.patientId,
//           siteName: param?.siteName,
//           subjectId: param?.patientId,
//           email: param?.email ?? '',
//           name: param?.name ?? '',
//           phone: param?.phone ?? '',
//           patientStatus: PatientStatusEnum.NoneUpload,
//         };
//         console.log('body', body);
//         dispatch(addLocalSubject(body));
//         onFail && onFail(e.toString(), body);
//         dispatch(onSetVisibleSpinner(false));
//       }
//       onFail && onFail(e ?? '');
//     }
//     dispatch(onSetVisibleSpinner(false));
//   };
