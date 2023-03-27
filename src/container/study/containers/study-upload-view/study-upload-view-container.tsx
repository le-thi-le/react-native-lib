// import { AppState } from '@src/core/store';
// import React, { useEffect, useState } from 'react';
// import { NavigationInjectedProps } from 'react-navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   BodyPartEnum,
//   StudyMiniAppParam,
// } from '../../constants/study-constants';
// import {
//   ImageModel,
//   StudyAppBodyRegionModel,
//   SubjectModel,
// } from '../../models/subject/subject.model';
// import {
//   onThunkGetAllImageForSubject,
//   onThunkUpDateSubject,
//   onThunkVerifyShowSuggestionModal,
// } from './store/thunk';
// import { VisibleModalSuggestionState } from './store/reducer/types';
// import { VisitDetailParam } from '../../models/study.model';
// import { SuggestionModal } from '../../components/modal/study-suggest-modal';
// import UpLoadPhoto from './study-upload-view-component';
// import { updateLocalSubject } from '../study-subject-list/store/reducer/action';
// // import { crashlyticsHelper } from '@src/core/libs/crashlytics-helper';
// // import { EventNameEnum } from '@src/core/libs/constants';
// export const UpLoadPhotoContainer: React.FunctionComponent<
//   NavigationInjectedProps
// > = (props) => {
//   const navigationKey = 'UpLoadPhotoContainer';
//   const dispatch = useDispatch();
//   const subjectParam = props.navigation.getParam(
//     StudyMiniAppParam.SubjectParam,
//   ) as SubjectModel;
//   const [listBodyPart, setList] = useState<StudyAppBodyRegionModel[]>([
//     new StudyAppBodyRegionModel(BodyPartEnum.UpperFront, ''),
//     new StudyAppBodyRegionModel(BodyPartEnum.LowerFront, ''),
//     new StudyAppBodyRegionModel(BodyPartEnum.UpperBack, ''),
//     new StudyAppBodyRegionModel(BodyPartEnum.LowerBack, ''),
//   ]);
//   const subjectModel = React.useRef<SubjectModel>(subjectParam);
//   const { isShow }: VisibleModalSuggestionState = useSelector(
//     (state: AppState) => state.isShowSuggestion,
//   );
//   /* flag show modal suggesion */
//   const [isShowModal, setShow] = React.useState(false);
//   useEffect(() => {
//     dispatch(
//       onThunkGetAllImageForSubject(
//         subjectModel.current.patientId,
//         true,
//         subjectModel.current.patientStatus,
//         (list: StudyAppBodyRegionModel[], showSuggestion: boolean) => {
//           setList([
//             ...list.sort((a, b) => {
//               return a.bodyPart - b.bodyPart;
//             }),
//           ]);
//           setShow(showSuggestion);
//         },
//       ),
//     );
//     // PayloadService.instance
//     //   .getAllImageOfSubject(subjectModel.current.patientId ?? '', true)
//     //   .then((value) => {
//     //     let listEmpty = value.filter((item) => isEmpty(item.imageValue));
//     //     toasts.warning(listEmpty.length.toString());
//     //     if (listEmpty.length > 0) {
//     //       setShow(isShow ?? true);
//     //       ///
//     //     } else {
//     //       if (subjectModel.current.patientStatus === 1) {
//     //         toasts.success('suss');
//     //         CameraConfig.deleteCachedFiles(subjectModel.current.patientId);
//     //         fileHelper
//     //           .removeCachedFiles(subjectModel.current.patientId)
//     //           .then(() => {
//     //             setList([...value]);
//     //             toasts.warning('delete');
//     //           });
//     //       }
//     //       setShow(false);
//     //     }
//     //     setList([...value]);
//     //   });
//   }, [subjectModel]);
//   // console.log('aad', listBodyPart);
//   /* on back to all screen */
//   const onGoBack = () => {
//     crashlyticsHelper.logEvent(
//       props.navigation?.state?.routeName ?? '',
//       EventNameEnum.goBack,
//     );
//     setList([]);
//     const rollback = props.navigation.getParam(StudyMiniAppParam.RollBack);
//     if (typeof rollback === 'function') {
//       rollback();
//     }
//     props.navigation.goBack();
//   };
//   /*
//    * handle item click
//    */
//   const onPress = (valueBodyPart: StudyAppBodyRegionModel) => {
//     crashlyticsHelper.logEvent(
//       props.navigation?.state?.routeName ?? '',
//       EventNameEnum.selectBodyRegion,
//     );
//     const param = new VisitDetailParam();
//     param.bodyPart = valueBodyPart.bodyPart;
//     param.type = valueBodyPart.getTypeUpload();
//     param.subjectId = subjectModel.current.patientId ?? '';
//     param.studyId = subjectModel.current.clinicalStudyId;
//     param.listBodyRegion = listBodyPart;
//     param.stateBodyPart = valueBodyPart.stateBodyPart;
//     param.imageBase64 = valueBodyPart.imageValue;
//     param.messagePreviewFail = valueBodyPart.messageUploadFail;
//     param.previewState = valueBodyPart.previewState;
//     props.navigation.navigate({
//       key: navigationKey,
//       routeName: 'preview',
//       params: {
//         [StudyMiniAppParam.VisitDetail]: param,
//         [StudyMiniAppParam.RollBack]: onRollBack,
//       },
//     });
//   };
//   const onRollBack = async (
//     oldSubjectId: string,
//     oldStudyId: string,
//     listResult: StudyAppBodyRegionModel[],
//   ) => {
//     subjectModel.current.patientId = oldSubjectId;
//     subjectModel.current.clinicalStudyId = oldStudyId;
//     setList([...listResult]);
//   };
//   const onClose = (isAccept: boolean) => {
//     setShow(false);
//     if (isAccept) {
//       dispatch(onThunkVerifyShowSuggestionModal(false));
//     }
//   };
//   const onRightButtonPress = () => {
//     crashlyticsHelper.logEvent(
//       props.navigation?.state?.routeName ?? '',
//       EventNameEnum.openSetting,
//     );
//     props.navigation.navigate({
//       key: navigationKey,
//       routeName: 'StudySetting',
//       params: {},
//     });
//   };
//   return (
//     <>
//       <SuggestionModal
//         isShow={isShowModal}
//         onClose={onClose}
//         onChangeCheckBox={onClose}
//       />
//       <UpLoadPhoto
//         onGoBack={onGoBack}
//         onRightIconPress={onRightButtonPress}
//         onPress={onPress}
//         bodyParts={listBodyPart}
//         subjectModel={subjectModel.current}
//       />
//     </>
//   );
// };
