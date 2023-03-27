// import React, { useEffect, useState } from 'react';
// import MiniAppStudy from './study-subject-list.component';
// import { NavigationInjectedProps } from 'react-navigation';
// import { StudyAppState } from './store/reducer/types';
// import { useDispatch, useSelector } from 'react-redux';
// // import { AppState, store } from '../../../../core/store';
// // import {
// //   onThunkAddNewSubject,
// //   onThunkGetAllStudyAndSite,
// //   onThunkGetAllSubjects,
// // } from './store/thunk';
// import { toasts } from '../../../../core/libs/toasts';

// import { dateToDDmmYYYYFormatter } from '../../../../core/libs/formatters';
// import { getImageName, isEmpty } from '../../../../core/libs/utils';
// import {
//   onThunkCreateVisitForUpload,
//   onThunkUploadImageOnSubject,
//   onThunkVerifyShowSuggestionModal,
// } from '../study-upload-view/store/thunk';
// import {
//   AllPatientsParam,
//   ImageModel,
//   StudyAppBodyRegionModel,
//   SubjectModel,
//   SubjectParam,
// } from '../../models/subject/subject.model';
// import { SubjectService } from '../../services/study-subject.service';
// import {
//   PatientStatusEnum,
//   StateUpload,
//   StudyMiniAppParam,
//   StudyMiniAppTypeAddSubEnum,
//   StudyMiniAppTypeDDLEnum,
// } from '../../constants/study-constants';
// import { SubjectUploadModel } from '../../models/study.model';
// import { DropdownValue } from '../../models/dropdown.model';
// import OverrideModal from '../../components/modal/study-override-subject-modal';
// // import NetInfo from '@react-native-community/netinfo';
// // import { NavigationService } from '../../../../core/navigation/service';
// // import {
// //   onClearSession,
// //   onSetUserPermission,
// // } from '../../../../core/store/reducer/session/actions';
// import { getAllSubject, updateLocalSubject } from './store/reducer/action';
// import { CameraConfig } from '../study-upload-view/study-camera-config';
// import {  saveImageStatus } from '../../../../core/libs/file-helper';
// import ProgressBarStudy from '../../components/modal/study-progress-bar';
// // import {
// //   EventTrackNameEnum,
// //   analyticsHelper,
// // } from '../../../../core/libs/analytic-helper';
// // import { authHelper } from '../../../../core/libs/auth-helper';
// // import { onThunkGetUserWithOrg } from '../../../../containers/auth-2/store/thunk';
// // import { EventNameEnum } from '../../../../core/libs/constants';
// // import { crashlyticsHelper } from '../../../../core/libs/crashlytics-helper';

// export const MiniAppStudyContainer: React.FunctionComponent<
//   NavigationInjectedProps
// > = (props) => {
//   const dispatch = useDispatch();
//   const navigationKey = 'miniAppStudyContainer';
//   const { session } = useSelector((state: AppState) => state.session);
//   const { subjects, studies, sites }: StudyAppState = useSelector(
//     (state: AppState) => state.studyMiniApp,
//   );
//   const { currentUserInfo } = useSelector((state: AppState) => state.session);

//   const [isShowOverride, setIsShowOverride] = useState(false);
//   const [subjectModel, setSubjectSelect] = useState<SubjectModel>();
//   const [param, setParam] = useState<SubjectParam>(new SubjectParam('', ''));
//   const [loading, setIsLoading] = useState<boolean>(true);
//   const [isFetching, setIsFetching] = useState<boolean>(false);
//   const isOffline = SubjectService.instance.checkSubjectsExistOff();
//   const [isShowOfflineModal, setShowModalOffline] = useState<boolean>(false);
//   const [focused, setFocused] = useState<boolean>(true);
//   const [percentage, setPercentage] = useState<number>(0);
//   const [titleMessage, setTitleMessage] = useState<string>('');
//   const [isConnected, setIsConnected] = useState<boolean>();

//   // set focus
//   useEffect(() => {
//     const didFocus = props.navigation.addListener('didFocus', () => {
//       setFocused(true);
//     });

//     const didBlurSubscription = props.navigation.addListener('didBlur', () => {
//       setFocused(false);
//     });
//     return () => {
//       didFocus.remove();
//       didBlurSubscription.remove();
//     };
//   }, [props.navigation]);

//   useEffect(() => {
//     // Subscribe to network state updates
//     const unsubscribe = NetInfo.addEventListener((state) => {
//       if (
//         state.isInternetReachable === true &&
//         state.isConnected === true &&
//         state.type === 'wifi' &&
//         isConnected !== true
//       ) {
//         setIsConnected(true);
//       } else {
//         if (
//           isConnected !== false &&
//           state.isInternetReachable === false &&
//           (state.isConnected === false || state.type !== 'wifi')
//         ) {
//           setShowModalOffline(false);
//           setIsConnected(false);
//         }
//       }
//     });
//     return () => {
//       // Unsubscribe to network state updates
//       unsubscribe();
//     };
//   });

//   useEffect(() => {
//     if (isConnected === true && focused && !isEmpty(session?.idToken)) {
//       toasts.success('You are online. Data will synchronize with server');
//       setTimeout(() => {
//         onRefresh();
//       }, 2500);
//     } else if (isConnected === false && focused && !isEmpty(session?.idToken)) {
//       toasts.warning('You are offline. Please connect to wifi/internet');
//     }
//   }, [isConnected]);
//   //show suggestion
//   useEffect(() => {
//     const { isShow } = store.getState().isShowSuggestion;
//     if (isEmpty(isShow)) {
//       dispatch(onThunkVerifyShowSuggestionModal(true));
//     }
//   }, []);
//   //log screen
//   useEffect(() => {
//     // analyticsHelper.logScreen('subject list', 'subject list');
//   }, []);
//   //get study site data when token change
//   useEffect(() => {
//     if (focused && !isEmpty(session?.idToken)) {
//       dispatch(
//         onThunkGetAllStudyAndSite(
//           //success
//           (studyDefault, siteDefault) => {
//             // setParam(new SubjectParam(siteDefault, studyDefault));
//           },
//           //fail
//           (message) => {
//             if (message === 'Error: Network Error') {
//               toasts.warning(
//                 'You are offline. Please connect to wifi/internet',
//               );
//             }
//           },
//         ),
//       );
//     }
//   }, [session?.idToken]);
//   //get all subject
//   // useEffect(() => {
//   //   if ((focused, isConnected)) {
//   //     onRefresh();
//   //   }
//   // }, [session?.idToken, param]);

//   const onFilterSubject = () => {
//     if (param.valueSite !== '' && param.valueStudy !== '') {
//       const filter = subjects.filter(
//         (e) =>
//           e.siteName === param.valueSite &&
//           e.clinicalStudyId === param.valueStudy,
//       );
//       return filter;
//     }
//     if (param.valueSite !== '' && param.valueStudy === '') {
//       const filter = subjects.filter((e) => e.siteName === param.valueSite);
//       return filter;
//     }
//     if (param.valueSite === '' && param.valueStudy !== '') {
//       const filter = subjects.filter(
//         (e) => e.clinicalStudyId === param.valueStudy,
//       );
//       return filter;
//     } else {
//       return subjects;
//     }
//   };

//   const onGoBack = () => {
//     props.navigation.goBack();
//   };

//   const onRightButtonPress = () => {
//     // crashlyticsHelper.logEvent('Subject list', 'open setting');

//     props.navigation.navigate({
//       key: navigationKey,
//       routeName: 'StudySetting',
//       params: {},
//     });
//   };

//   const onGoUpLoad = (newParam: SubjectModel) => {
//     // crashlyticsHelper.logEvent(
//     //   props.navigation?.state?.routeName ?? '',
//     //   EventNameEnum.goToUpload,
//     // );
//     if (
//       subjects.find((item) => item.patientId === newParam.patientId)
//         ?.patientStatus === 1
//     ) {
//       setIsShowOverride(true);
//       //lay value
//       setSubjectSelect(newParam);
//     } else {
//       props.navigation.navigate({
//         key: navigationKey,
//         routeName: 'UpLoadPhoto',
//         params: {
//           [StudyMiniAppParam.SubjectParam]: newParam,
//           [StudyMiniAppParam.RollBack]: onRollBack,
//         },
//       });
//     }
//   };

//   const onPressYes = () => {
//     const paramSubject = new SubjectUploadModel();
//     paramSubject.subjectId = subjectModel?.patientId;
//     paramSubject.studyId = subjectModel?.clinicalStudyId;
//     props.navigation.navigate({
//       key: navigationKey,
//       routeName: 'UpLoadPhoto',
//       params: {
//         [StudyMiniAppParam.SubjectParam]: subjectModel,
//         [StudyMiniAppParam.RollBack]: onRollBack,
//       },
//     });
//   };

//   const onDDlChangeValue = (value: DropdownValue, type: string) => {
//     if (type === StudyMiniAppTypeDDLEnum.Site) {
//       setParam(new SubjectParam(value.key, param.valueStudy));
//       return;
//     }
//     if (type === StudyMiniAppTypeDDLEnum.Study) {
//       setParam(new SubjectParam(param.valueSite, value.key));
//       return;
//     }
//   };

//   const onRollBack = () => {
//     setFocused(true);
//     setParam(new SubjectParam(param.valueSite, param.valueStudy));
//   };

//   const onSaveSubjectDone = (
//     type: string,
//     value: string,
//     subject?: SubjectModel,
//   ) => {
//     if (type === StudyMiniAppTypeAddSubEnum.SaveAndContinue) {
//       const paramSubject = new SubjectModel();
//       paramSubject.patientId = value;
//       paramSubject.clinicalStudyId = param.valueStudy ?? '';
//       props.navigation.navigate({
//         key: navigationKey,
//         routeName: 'UpLoadPhoto',
//         params: {
//           [StudyMiniAppParam.RollBack]: onRollBack,
//           [StudyMiniAppParam.SubjectParam]: subject ?? paramSubject,
//         },
//       });
//     } else {
//       setParam(new SubjectParam(param.valueSite, param.valueStudy));
//     }
//   };

//   const UploadAnImage = async (
//     image: ImageModel,
//     subject: SubjectModel,
//     visitDiagnosticId: string,
//     listSubjects: SubjectModel[],
//   ) => {
//     return new Promise((res, rej) => {
//       // start event log
//       // analyticsHelper.eventTrack(EventTrackNameEnum.studyUploadImage, {
//       //   org_id: currentUserInfo?.orgRoleList[0]?.orgId,
//       //   site_id: subject?.siteName,
//       //   study_id: subject?.clinicalStudyId,
//       //   ai_engine_id: currentUserInfo?.orgRoleList[0]?.moduleAccess,
//       //   type: image.bodyPart ? getImageName(image.bodyPart) : '',
//       // });
//       //end
//       dispatch(
//         onThunkUploadImageOnSubject(
//           subject,
//           new StudyAppBodyRegionModel(image.bodyPart, '', visitDiagnosticId),
//           // on event
//           async (model: StudyAppBodyRegionModel) => {
//             const indexNewItem = listSubjects.findIndex(
//               (item) => item.patientId === subject.patientId,
//             );
//             if (model.stateBodyPart === StateUpload.UploadDone) {
//               var subjectSuccess = await saveImageStatus(
//                 image.bodyPart,
//                 subject.patientId,
//                 listSubjects,
//                 StateUpload.UploadDone,
//               );
//               dispatch(
//                 updateLocalSubject(
//                   listSubjects.splice(indexNewItem, 1, subjectSuccess),
//                 ),
//               );
//               res(1);
//             } else {
//               var subjectFail = await saveImageStatus(
//                 image.bodyPart,
//                 subject.patientId,
//                 listSubjects,
//                 StateUpload.UploadFail,
//               );
//               dispatch(
//                 updateLocalSubject(
//                   listSubjects.splice(indexNewItem, 1, subjectFail),
//                 ),
//               );
//               res(0);
//             }
//           },
//           (error) => {
//             console.log('error', error);
//             res(0);
//           },
//         ),
//       );
//     });
//   };

//   const CreateVisitAndUpload = async (
//     subject: SubjectModel,
//     listSubjects: SubjectModel[],
//   ) => {
//     return new Promise((res, rej) => {
//       // start event log
//       // analyticsHelper.eventTrack(EventTrackNameEnum.studyVisitSubmitted, {
//       //   org_id: currentUserInfo?.orgRoleList[0]?.orgId,
//       //   site_id: subject?.siteName,
//       //   study_id: subject?.clinicalStudyId,
//       //   ai_engine_id: currentUserInfo?.orgRoleList[0]?.moduleAccess,
//       // });
//       //end
//       dispatch(
//         onThunkCreateVisitForUpload(
//           //tao visit
//           subject,
//           //create done
//           async (newVisitDiagnosticId: string) => {
//             var imageUpload = subject.image?.filter(
//               (item) => item.status !== StateUpload.UploadDone,
//             );
//             var success = await Promise.all(
//               imageUpload.map((item) => {
//                 return UploadAnImage(
//                   item,
//                   subject,
//                   newVisitDiagnosticId,
//                   listSubjects,
//                 );
//               }),
//             );
//             setPercentage(80);
//             const indexNewItem = listSubjects.findIndex(
//               (item) => item.patientId === subject.patientId,
//             );
//             if (
//               success.filter((e) => e === 1).length +
//                 (subject.image?.length - imageUpload?.length) ===
//               subject.image?.length
//             ) {
//               subject.patientStatus = PatientStatusEnum.UploadDone;
//               subject.image = [];
//               subject.notes = '';
//               subject.todayVisitUploadedAt = new Date().toISOString();
//               dispatch(
//                 updateLocalSubject(
//                   listSubjects.splice(indexNewItem, 1, subject),
//                 ),
//               );
//               CameraConfig.deleteCachedFiles(subject.patientId);
//             } else {
//               subject.patientStatus = PatientStatusEnum.UploadFail;
//               dispatch(
//                 updateLocalSubject(
//                   listSubjects.splice(indexNewItem, 1, subject),
//                 ),
//               );
//             }
//             res(success);
//           },
//           // create fail
//           (message) => {
//             const indexNewItem = listSubjects.findIndex(
//               (item) => item.patientId === subject.patientId,
//             );
//             subject.patientStatus = PatientStatusEnum.UploadFail;
//             dispatch(
//               updateLocalSubject(listSubjects.splice(indexNewItem, 1, subject)),
//             );
//             console.log('message', message);
//             // toasts.warning(message);
//             res(message);
//           },
//           false,
//           subject.notes,
//         ),
//       );
//     });
//   };

//   const addSubjectOff = async (
//     e: SubjectModel,
//     listSubjects: SubjectModel[],
//   ) => {
//     return new Promise((res, rej) => {
//       dispatch(
//         onThunkAddNewSubject(
//           //success
//           (data: any) => {
//             // toasts.success(`Create ${e.patientId} successfully.`);
//             e.id = data?.['subjectId'];
//             // e.visitDiagnosticId=data?.['visitDiagnosticId']
//             dispatch(
//               updateLocalSubject(
//                 listSubjects.splice(
//                   listSubjects.findIndex(
//                     (item) => item.patientId === e.patientId,
//                   ),
//                   1,
//                   e,
//                 ),
//               ),
//             );
//             res(1);
//           },
//           //fail
//           (message: string) => {
//             if (message === '401') {
//               if (store.getState().session.loggedIn) {
//                 dispatch(onThunkRefreshTokenCognito(onSussess));
//               } else {
//                 dispatch(onClearSession());
//                 NavigationService.navigate('auth');
//               }
//             } else if (message === 'CreateSubject.SubjectExisted') {
//               res(1);
//               return;
//             } else if (message === 'CreateSubject.Invalid') {
//               e.patientStatus = PatientStatusEnum.CannotCreate;
//               dispatch(
//                 updateLocalSubject(
//                   listSubjects.splice(
//                     listSubjects.findIndex(
//                       (item) => item.patientId === e.patientId,
//                     ),
//                     1,
//                     e,
//                   ),
//                 ),
//               );
//             } else {
//               toasts.warning(message);
//             }
//             res(0);
//           },
//           e,
//           false,
//           listSubjects,
//         ),
//       );
//     });
//   };
//   const checkData = async (data: SubjectModel[]) => {
//     //update data from sever to local
//     const listSubjectsUpdate = subjects.map((obj) => {
//       if (data.find((e) => e.id === obj.id)) {
//         return {
//           ...obj,
//           isActive: data.find((e) => e.id === obj.id)?.isActive ?? 1,
//           email: data.find((e) => e.id === obj.id)?.email ?? '',
//           siteName: data.find((e) => e.id === obj.id)?.siteName,
//           phone: data.find((e) => e.id === obj.id)?.phone ?? '',
//           name: data.find((e) => e.id === obj.id)?.name ?? '',
//           // todayVisitUploadedAt: data.find((e) => e.id === obj.id)
//           //   ?.todayVisitUploadedAt,
//           updatedAt: data.find((e) => e.id === obj.id)?.updatedAt,
//         };
//       }
//       return obj;
//     });
//     const listSubjectAdded = data
//       .filter(
//         (bb) =>
//           !listSubjectsUpdate.find(
//             (aa) => aa['patientId'] === bb['patientId'] && aa.id !== '',
//           ),
//       )
//       .concat(listSubjectsUpdate);
//     const merge = listSubjectAdded.filter(
//       (aa) => data.find((bb) => aa.id === bb.id) || aa.id === '',
//     );

//     const newListSubject = dispatch(getAllSubject(merge));
//     const addSubjectOffline = newListSubject.payload.filter((e) => e.id === '');
//     setTimeout(() => {
//       setPercentage(20);
//       setTitleMessage('Submitting offline subjects to server...');
//     }, 500);
//     if (addSubjectOffline.length > 0) {
//       var pAddSubjectOff = await Promise.all(
//         addSubjectOffline.map((e) => {
//           return addSubjectOff(e, newListSubject.payload);
//         }),
//       );
//       if (pAddSubjectOff.length === addSubjectOffline.length) {
//         console.log('bbbbbb', pAddSubjectOff);
//       }
//     }
//     const listUpload = newListSubject.payload.filter(
//       (e) =>
//         e.image?.length === 4 &&
//         e.patientStatus !== PatientStatusEnum.CannotCreate,
//     );
//     if (listUpload.length > 0) {
//       setTimeout(() => {
//         setPercentage(40);
//         setTitleMessage('Uploading offline photos to server...');
//       }, 1000);

//       // var percentageUpload = 100 / listUpload.length;
//       var pUpload = await Promise.all(
//         listUpload.map((item) => {
//           return CreateVisitAndUpload(item, newListSubject.payload);
//         }),
//       );
//       if (pUpload.length === listUpload.length) {
//         setTimeout(() => {
//           setPercentage(100);
//           setShowModalOffline(false);
//         }, 1000);
//       }
//     } else {
//       setTimeout(() => {
//         setPercentage(100);
//         setShowModalOffline(false);
//       }, 500);
//     }
//   };
//   const onRefresh = () => {
//     setPercentage(0);
//     setTitleMessage('Retrieving subjects from server...');
//     setShowModalOffline(true);
//     const newParam = new AllPatientsParam(
//       //study
//       [],
//       //from date
//       dateToDDmmYYYYFormatter(new Date()),
//       //keyword
//       '',
//       //length
//       10,
//       //site
//       '',
//       //skinModuleType
//       StudyMiniAppParam.Easi,
//       //start
//       1,
//     );
//     if (!isEmpty(session?.idToken)) {
//       dispatch(
//         onThunkGetAllSubjects(
//           //success
//           (data: SubjectModel[]) => {
//             if (subjects.length === 0) {
//               dispatch(getAllSubject(data));
//               setShowModalOffline(false);
//             } else {
//               checkData(data);
//               // .then((data) => {
//               //   dispatch(getAllSubject(data));
//               //   console.log('data', data);
//               // });
//             }
//           },
//           // fail
//           (message) => {
//             setShowModalOffline(false);
//             onFilterSubject();
//           },
//           // param
//           newParam,
//         ),
//       );
//     }
//     // }
//   };

//   return (
//     <>
//       <OverrideModal
//         title={'Override this upload?'}
//         value={undefined}
//         isVisible={isShowOverride}
//         onCloseModal={() => setIsShowOverride(false)}
//         onPressYes={onPressYes}
//         subTitle={'This upload will override previously uploaded photos'}
//       />
//       <ProgressBarStudy
//         titleMessage={titleMessage}
//         value={percentage}
//         isVisible={isShowOfflineModal}
//       />
//       <MiniAppStudy
//         onGoBack={onGoBack}
//         onRightIconPress={onRightButtonPress}
//         onGoUpLoad={onGoUpLoad}
//         subject={onFilterSubject()}
//         onDDLChangeValue={onDDlChangeValue}
//         onSaveSubjectDone={onSaveSubjectDone}
//         loading={loading}
//         onRefresh={onRefresh}
//         isFetching={isFetching}
//         paramRequest={param}
//       />
//     </>
//   );
// };



import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

export const MiniAppStudyContainer: React.FunctionComponent<
  NavigationInjectedProps
> = (props) => {
  const navigationKey = 'MiniAppStudyContainer';
 

  const onStart = () =>{
    props.navigation.navigate({routeName: 'preview'});
  }
  return <View style={{justifyContent: 'center'}}>
    <TouchableOpacity onPress={onStart}>
        <View style={{width: 100, height: 100 , backgroundColor:'red'}}> Open screen 1</View>
    </TouchableOpacity>
  </View>;
};

