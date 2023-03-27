// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ImageSourcePropType,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import React, { useEffect } from 'react';
// import { getImageName, isEmpty, pxToPercentage } from '../../../core/libs/utils';
// import { textStyle } from '../../../components';
// import { themes } from '../../../core/themes';

// import {
//   imageLowerBack,
//   imageLowerFront,
//   imageUpperBack,
//   imageUpperFront,
// } from '../../../assets/images';
// import { useDispatch, useSelector } from 'react-redux';
// import { CheckedIcon, Close2Icon } from '../../../assets/icons';
// import {
//   StudyAppBodyRegionModel,
//   SubjectModel,
// } from '../models/subject/subject.model';
// import { BodyPartEnum, StateUpload } from '../constants/study-constants';
// import { onThunkUploadImageOnSubject } from '../containers/study-upload-view/store/thunk';
// import { AppState } from '../../../core/store';
// import { StudyAppState } from '../containers/study-subject-list/store/reducer/types';
// import { updateLocalSubject } from '../containers/study-subject-list/store/reducer/action';
// import { saveImageStatus } from '../../../core/libs/file-helper';


// interface ComponentProps {
//   onPress: (valueBodyPart: StudyAppBodyRegionModel) => void;
//   content: StudyAppBodyRegionModel;
//   state: StateUpload;
//   currentSubject: SubjectModel;
//   onUploaded: (model?: StudyAppBodyRegionModel) => void;
// }

// export type BodyPartProps = ComponentProps;
// export const BodyPart: React.FunctionComponent<BodyPartProps> = (props) => {
//   const [content, setContent] = React.useState(props.content);
//   const dispatch = useDispatch();
//   const [statePart, setState] = React.useState(props.state);
//   const { subjects }: StudyAppState = useSelector(
//     (state: AppState) => state.studyMiniApp,
//   );
//   const { currentUserInfo } = useSelector((state: AppState) => state.session);

//   // console.log('props.content', props?.content);
//   useEffect(() => {
//     if (props.content.stateBodyPart !== StateUpload.UploadDone) {
//       setState(props.state);
//     } else {
//       props.onUploaded(props.content);
//     }
//     if (
//       props.state === StateUpload.Uploading &&
//       !isEmpty(props.content.visitDiagnosticId) &&
//       statePart !== StateUpload.UploadDone
//     ) {
//       // setState(props.state);
//       // start event log
//       // analyticsHelper.eventTrack(EventTrackNameEnum.studyUploadImage, {
//       //   org_id: currentUserInfo?.orgRoleList[0]?.orgId,
//       //   site_id: props.currentSubject?.siteName,
//       //   study_id: props.currentSubject?.clinicalStudyId,
//       //   ai_engine_id: currentUserInfo?.orgRoleList[0]?.moduleAccess,
//       //   type: getImageName(props.content.bodyPart),
//       // });
//       //end
//       dispatch(
//         onThunkUploadImageOnSubject(
//           props.currentSubject,
//           props.content,
//           // on event
//           async (model: StudyAppBodyRegionModel) => {
//             setContent(model);
//             setState(model.stateBodyPart);
//             props.onUploaded(model);
//           },
//           async (error) => {
//             //TODO check to offline
//             if (error === 'Error: Network Error') {
//               console.log('errr', error);
//               setState(StateUpload.UploadFail);
//               const indexNewItem = subjects.findIndex(
//                 (e) => e.patientId === props.currentSubject.patientId,
//               );
//               props.currentSubject = await saveImageStatus(
//                 props.content.bodyPart,
//                 props.currentSubject.patientId,
//                 subjects,
//                 StateUpload.UploadFail,
//               );
//               props.currentSubject.patientStatus = StateUpload.Offline;
//               dispatch(
//                 updateLocalSubject(
//                   subjects.splice(indexNewItem, 1, props.currentSubject),
//                 ),
//               );
//               console.log(
//                 '_____________',
//                 subjects.splice(indexNewItem, 1, props.currentSubject),
//               );
//               props.onUploaded();
//             }
//           },
//         ),
//       );
//     }
//   }, [props.state]);
//   const getImageSource = () => {
//     switch (content.bodyPart) {
//       case BodyPartEnum.UpperFront: {
//         return imageUpperFront.imageSource;
//       }
//       case BodyPartEnum.LowerFront: {
//         return imageLowerFront.imageSource;
//       }
//       case BodyPartEnum.UpperBack: {
//         return imageUpperBack.imageSource;
//       }
//       default: {
//         return imageLowerBack.imageSource;
//       }
//     }
//   };
//   const getStringTitle = () => {
//     switch (content.bodyPart) {
//       case BodyPartEnum.UpperFront:
//         // return I18n.t('home.txtUpperBack');
//         return 'Upper Front';

//       case BodyPartEnum.LowerFront:
//         // return I18n.t('home.txtLowerFront');
//         return 'Lower Front';

//       case BodyPartEnum.UpperBack:
//         // return I18n.t('home.txtLowerBack');
//         return 'Upper Back';

//       default:
//         // return I18n.t('home.txtUpperFront');
//         return 'Lower Back';
//     }
//   };
//   const onPress = () => {
//     props.onPress(props.content);
//   };

//   const getStatusBodyPart = () => {
//     switch (statePart) {
//       case StateUpload.UploadDone: {
//         return (
//           <View style={styles.viewStatusBody}>
//             <View style={styles.viewStatusContent}>
//               {CheckedIcon(styles.iconChecked)}
//               <Text style={styles.txtStatus}>UPLOADED</Text>
//             </View>
//           </View>
//         );
//       }
//       // case StateUpload.Offline:{}
//       case StateUpload.UploadFail: {
//         return (
//           <View style={styles.viewStatusBody}>
//             <View style={styles.viewStatusContent}>
//               {Close2Icon(styles.iconX)}
//               <Text style={styles.txtStatus}>FAILED</Text>
//             </View>
//           </View>
//         );
//       }
//       case StateUpload.Uploading: {
//         return (
//           <View style={styles.viewStatusBody}>
//             <View style={styles.viewStatusContent}>
//               <ActivityIndicator size="small" color="#3A3379" />
//               <Text style={styles.txtStatus}>Uploading</Text>
//             </View>
//           </View>
//         );
//       }
//       default:
//         return null;
//     }
//   };
//   return isEmpty(props.content.imageValue) ? (
//     <TouchableOpacity
//       style={styles.btnItem}
//       onPress={onPress}
//       activeOpacity={0.75}>
//       <Text style={styles.txtTitleBodyPart}>
//         {getStringTitle().toUpperCase()}
//       </Text>
//       <Image source={getImageSource()} />
//     </TouchableOpacity>
//   ) : (
//     <TouchableOpacity
//       style={styles.btnItem}
//       onPress={onPress}
//       activeOpacity={0.75}
//       disabled={statePart === StateUpload.Uploading ? true : false}>
//       <View style={styles.viewTitleImage}>
//         <Text style={styles.txtTitleBodyPart2}>
//           {getStringTitle().toUpperCase()}
//         </Text>
//       </View>
//       {getStatusBodyPart()}

//       <Image
//         source={{ uri: `data:image/png;base64,${props.content.imageValue!}` }}
//         resizeMode={'cover'}
//         style={{
//           width: pxToPercentage(150),
//           height: pxToPercentage(181),
//           borderRadius: pxToPercentage(6),
//         }}
//       />
//     </TouchableOpacity>
//   );
// };
// const styles = StyleSheet.create({
//   btnItem: {
//     flexDirection: 'column',
//     marginHorizontal: pxToPercentage(7.5),
//     marginVertical: pxToPercentage(7.5),
//     backgroundColor: themes['App Theme']['main-color-2'],
//     height: pxToPercentage(181),
//     width: pxToPercentage(150),
//     borderRadius: pxToPercentage(6),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   txtTitleBodyPart: {
//     color: 'white',
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(14),
//     textAlign: 'center',
//     marginBottom: pxToPercentage(7),
//   },
//   txtTitleBodyPart2: {
//     color: 'white',
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(14),
//     textAlign: 'center',
//     marginVertical: pxToPercentage(7),
//   },
//   viewTitleImage: {
//     position: 'absolute',
//     bottom: 0,
//     backgroundColor: '#C4C4C4',
//     width: 150,
//     zIndex: 999,
//     opacity: 0.8,
//     borderRadius: pxToPercentage(6),
//   },
//   iconChecked: {
//     width: 18,
//     height: 16,
//   },
//   iconX: {
//     width: 15,
//     height: 15,
//   },
//   viewStatusBody: {
//     position: 'absolute',
//     width: pxToPercentage(49),
//     height: pxToPercentage(49),
//     borderRadius: pxToPercentage(49),
//     borderWidth: pxToPercentage(3),
//     borderColor: '#3A3379',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     zIndex: 999,
//     opacity: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   txtStatus: {
//     color: '#3A3379',
//     ...textStyle.montserratExtraBold,
//     fontSize: pxToPercentage(5),
//     textTransform: 'uppercase',
//   },
//   viewStatusContent: { alignItems: 'center' },
// });
