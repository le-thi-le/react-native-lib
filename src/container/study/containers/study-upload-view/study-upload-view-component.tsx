// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   TextInput,
// } from 'react-native';
// import React, { useEffect } from 'react';
// import { themes } from '@src/core/themes';
// import {
//   Input,
//   ScrollableAvoidKeyboard,
//   textStyle,
//   ViewContainer,
// } from '@src/components';
// import { isEmpty, pxToPercentage } from '@src/core/libs/utils';
// import { CheckedIcon, Close2Icon } from '@src/assets/icons';
// import { CameraConfig } from './study-camera-config';
// import { useDispatch, useSelector } from 'react-redux';
// import { ScrollView } from 'react-navigation';
// import { fileHelper, saveImageStatus } from '@src/core/libs/file-helper';
// import { updateLocalSubject } from '../study-subject-list/store/reducer/action';
// import { MiniAppWebviewNavigationBar } from '../../../mini-app-webview/mini-app-webview-navigation-bar.component';
// import { BodyPart } from '../../components/study-body-part.component';
// import { onThunkCreateVisitForUpload } from './store/thunk';
// import { toasts } from '@src/core/libs/toasts';
// import {
//   StudyAppBodyRegionModel,
//   SubjectModel,
// } from '../../models/subject/subject.model';
// import {
//   BodyPartEnum,
//   PatientStatusEnum,
//   StateUpload,
// } from '../../constants/study-constants';
// import { AppState } from '@src/core/store';
// import { StudyAppState } from '../study-subject-list/store/reducer/types';
// import {
//   EventTrackNameEnum,
//   analyticsHelper,
// } from '@src/core/libs/analytic-helper';
// import { crashlyticsHelper } from '@src/core/libs/crashlytics-helper';
// import { EventNameEnum } from '@src/core/libs/constants';
// interface ComponentProps {
//   onGoBack: () => void;
//   onRightIconPress: () => void;
//   onPress: (valueBodyPart: StudyAppBodyRegionModel) => void;
//   subjectModel: SubjectModel;
//   bodyParts: StudyAppBodyRegionModel[];
// }
// export type UpLoadPhotoProps = ComponentProps;
// const UpLoadPhoto: React.FunctionComponent<UpLoadPhotoProps> = (props) => {
//   const { subjects }: StudyAppState = useSelector(
//     (state: AppState) => state.studyMiniApp,
//   );
//   const { currentUserInfo } = useSelector((state: AppState) => state.session);

//   const dispatch = useDispatch();
//   const getCurrentStatus = () => {
//     switch (props.subjectModel.patientStatus) {
//       case 1:
//         return StateUpload.NoneUpload;
//       case 0:
//         return StateUpload.UploadFail;
//       default:
//         return StateUpload.NoneUpload;
//     }
//   };
//   const [stateUpload, setState] = React.useState(StateUpload.NoneUpload);
//   const [text, setText] = React.useState(props.subjectModel.notes);

//   const [status, setStatus] = React.useState(getCurrentStatus());
//   const [height, setHeight] = React.useState(
//     status === StateUpload.NoneUpload ? 133 : 42,
//   );

//   const listResult = React.useRef<StudyAppBodyRegionModel[]>([]);
//   const [visitDiagnosticId, setVisitDiagnosticId] = React.useState('');
//   // const currentSubject = React.useRef<SubjectModel>(props.subjectModel);

//   //log screen
//   useEffect(() => {
//     analyticsHelper.logScreen('upload', 'upload');
//   }, []);

//   useEffect(() => {
//     if (status === StateUpload.UploadDone) {
//       CameraConfig.deleteCachedFiles(props.subjectModel.patientId);
//     }
//   }, [status]);
//   const onUploadPress = () => {
//     crashlyticsHelper.logEvent('upload', EventNameEnum.uploadImage);
//     setHeight(42);
//     listResult.current = [];
//     setStatus(StateUpload.Uploading);
//     // start event log
//     analyticsHelper.eventTrack(EventTrackNameEnum.studyVisitSubmitted, {
//       org_id: currentUserInfo?.orgRoleList[0]?.orgId,
//       site_id: props.subjectModel?.siteName,
//       study_id: props.subjectModel?.clinicalStudyId,
//       ai_engine_id: currentUserInfo?.orgRoleList[0]?.moduleAccess,
//     });
//     //end
//     dispatch(
//       onThunkCreateVisitForUpload(
//         props.subjectModel,
//         //create done
//         (newVisitDiagnosticId: string, subjectId?: string) => {
//           if (subjectId) {
//             props.subjectModel.id = subjectId;
//             props.subjectModel.notes = text;
//             dispatch(
//               updateLocalSubject(
//                 subjects.splice(
//                   subjects.findIndex(
//                     (item) => item.patientId === props.subjectModel.patientId,
//                   ),
//                   1,
//                   props.subjectModel,
//                 ),
//               ),
//             );
//           }
//           setVisitDiagnosticId(newVisitDiagnosticId);
//           setState(StateUpload.Uploading);
//         },
//         // create fail
//         (message) => {
//           toasts.warning(message);
//           if (message === 'Error: Network Error') {
//             setStatus(StateUpload.Offline);
//             setState(StateUpload.UploadFail);
//             const indexNewItem = subjects.findIndex(
//               (e) => e.patientId === props.subjectModel.patientId,
//             );
//             props.subjectModel.patientStatus = StateUpload.Offline;
//             props.subjectModel.notes = text;
//             dispatch(
//               updateLocalSubject(
//                 subjects.splice(indexNewItem, 1, props.subjectModel),
//               ),
//             );
//           } else {
//             setStatus(StateUpload.UploadFail);
//           }
//         },
//         false,
//         text,
//       ),
//     );
//   };

//   const groupUpper = props.bodyParts?.filter(
//     (item) =>
//       item.bodyPart === BodyPartEnum.UpperFront ||
//       item.bodyPart === BodyPartEnum.UpperBack,
//   );
//   const groupLower = props.bodyParts?.filter(
//     (item) =>
//       item.bodyPart === BodyPartEnum.LowerFront ||
//       item.bodyPart === BodyPartEnum.LowerBack,
//   );
//   const onPress = (valueBodyPart: StudyAppBodyRegionModel) => {
//     props.onPress(valueBodyPart);
//   };
//   const listBodyPart = (group: StudyAppBodyRegionModel[]) => {
//     return group
//       .sort((a, b) => a.bodyPart - b.bodyPart)
//       .map((data) => {
//         data.visitDiagnosticId = visitDiagnosticId;
//         return (
//           <BodyPart
//             onPress={onPress}
//             content={data}
//             state={stateUpload}
//             currentSubject={props.subjectModel}
//             onUploaded={onUploaded}
//           />
//         );
//       });
//   };
//   const onUploaded = async (model?: StudyAppBodyRegionModel) => {
//     const indexNewItem = subjects.findIndex(
//       (item) => item.patientId === props.subjectModel.patientId,
//     );
//     if (!model) {
//       setStatus(StateUpload.UploadFail);
//       setState(StateUpload.UploadFail);
//     } else {
//       props.subjectModel = await saveImageStatus(
//         model.bodyPart,
//         props.subjectModel.patientId,
//         subjects,
//         model.stateBodyPart,
//       );

//       if (listResult.current.length <= 4) {
//         listResult.current.push(model);
//         if (listResult.current.length === 4) {
//           const statusUpload = checkStatusUploaded();
//           setStatus(statusUpload);
//           if (statusUpload === StateUpload.UploadDone) {
//             setHeight(80);
//             listResult.current = [];
//             // setText('');
//             props.subjectModel.patientStatus = PatientStatusEnum.UploadDone;
//             props.subjectModel.image = [];
//             props.subjectModel.notes = '';
//             props.subjectModel.todayVisitUploadedAt = new Date().toString();
//             dispatch(
//               updateLocalSubject(
//                 subjects.splice(indexNewItem, 1, props.subjectModel),
//               ),
//             );
//             setState(StateUpload.UploadDone);
//           } else if (statusUpload === StateUpload.UploadFail) {
//             props.subjectModel.patientStatus = PatientStatusEnum.UploadFail;
//             dispatch(
//               updateLocalSubject(
//                 subjects.splice(indexNewItem, 1, props.subjectModel),
//               ),
//             );
//             setStatus(StateUpload.UploadFail);
//             // setState(StateUpload.UploadFail);
//           } else if (statusUpload === StateUpload.Offline) {
//             props.subjectModel.patientStatus = PatientStatusEnum.Offline;
//             dispatch(
//               updateLocalSubject(
//                 subjects.splice(indexNewItem, 1, props.subjectModel),
//               ),
//             );
//             setStatus(StateUpload.UploadFail);
//             // setState(StateUpload.UploadFail);
//           }
//           //TODO check case offline in here
//           // else if (statusUpload === StateUpload.Offline) {
//           //   setState(StateUpload.Offline);
//           //   currentSubject.current.patientStatus = PatientStatusEnum.Offline;
//           //   dispatch(updateLocalSubject(currentSubject.current));
//           // }
//         }
//       }
//     }
//   };
//   const checkShowTitleUpload = () => {
//     const result = props.bodyParts.filter((item) => isEmpty(item.imageValue));
//     return result.length === 0;
//   };
//   const listPartHasData = props.bodyParts.filter((item) =>
//     isEmpty(item.imageValue),
//   );
//   const checkStatusUploaded = () => {
//     switch (listResult.current.length) {
//       case 4: {
//         const itemUploaded = listResult.current.filter(
//           (item) => item.stateBodyPart === StateUpload.UploadDone,
//         );
//         const itemOffline = listResult.current.filter(
//           (item) => item.stateBodyPart === StateUpload.Offline,
//         );
//         if (itemUploaded.length === 4) {
//           return StateUpload.UploadDone;
//           //upload success
//         }
//         if (itemOffline.length > 0) {
//           return StateUpload.Offline;
//         } else {
//           return StateUpload.UploadFail;
//           //upload all fail
//         }
//       }
//       case 0: {
//         return StateUpload.NoneUpload;
//       }
//       default: {
//         return StateUpload.Uploading;
//       }
//     }
//   };
//   const onBackPress = async () => {
//     if (status === StateUpload.UploadDone) {
//       CameraConfig.deleteCachedFiles(props.subjectModel.patientId);
//       // await fileHelper.removeCachedFiles(props.subjectModel.patientId);
//     } else {
//       const indexNewItem = subjects.findIndex(
//         (e) => e.patientId === props.subjectModel.patientId,
//       );
//       props.subjectModel.notes = text;
//       if (listPartHasData.length === 0) {
//         props.subjectModel.patientStatus = StateUpload.Offline;
//       }
//       dispatch(
//         updateLocalSubject(
//           subjects.splice(indexNewItem, 1, props.subjectModel),
//         ),
//       );
//     }
//     props.onGoBack();
//   };
//   const onRightPress = async () => {
//     crashlyticsHelper.logEvent('Upload', 'open setting');
//     if (status === StateUpload.UploadDone) {
//       CameraConfig.deleteCachedFiles(props.subjectModel.patientId);
//       // await fileHelper.removeCachedFiles(props.subjectModel.patientId);
//     }
//     props.onRightIconPress();
//   };
//   return (
//     <ViewContainer>
//       <MiniAppWebviewNavigationBar
//         disabledLeftIcon={true}
//         title={'Belle Study™'}
//         onRightPress={onRightPress}
//       />
//       <ScrollableAvoidKeyboard>
//         <Text style={styles.txtPatient}>
//           {props.subjectModel.patientId ?? ''}
//         </Text>
//         <View style={styles.viewHr} />
//         <Text style={styles.txtTitle}>
//           {checkShowTitleUpload() ? 'Upload' : 'Select Body Region'}
//         </Text>
//         <View style={styles.flex1}>
//           <View style={styles.viewBodyPart}>{listBodyPart(groupUpper)}</View>
//           <View style={styles.viewBodyPart}>{listBodyPart(groupLower)}</View>

//           <TextInput
//             style={[styles.inputSimpleBorder, { height: height }]}
//             placeholder={'Enter notes (i.e. Week #) here'}
//             multiline={true}
//             numberOfLines={5}
//             value={text}
//             onChangeText={(value) => setText(value)}
//             onFocus={() => {
//               setHeight(133);
//               crashlyticsHelper.logEvent('upload screen', 'edit note');
//             }}
//             onBlur={() => {
//               if (
//                 status !== StateUpload.NoneUpload &&
//                 status !== StateUpload.UploadDone
//               ) {
//                 setHeight(42);
//               }
//             }}
//             editable={
//               !(
//                 status === StateUpload.Uploading ||
//                 status === StateUpload.UploadDone
//               )
//             }
//             placeholderTextColor={'gray'}
//             underlineColorAndroid={'transparent'}
//             autoCapitalize="none"
//           />
//           {status === StateUpload.Uploading ? (
//             <View style={styles.viewLoading}>
//               <ActivityIndicator
//                 size="large"
//                 color={'#3A3379'}
//                 style={styles.indicator}
//               />
//               <Text style={styles.txtLoading}>Uploading. Please wait.</Text>
//             </View>
//           ) : // ) : status === StateUpload.NoneUpload ? (
//           //   <View style={styles.view1} />
//           null}
//           {status === StateUpload.UploadDone ? (
//             <>
//               {/* <View style={{ height: pxToPercentage(150) }}> */}
//               <View style={styles.viewMessageSucc}>
//                 {CheckedIcon(styles.icon)}
//                 <Text style={styles.txtStatus}>
//                   All photos have been successfully uploaded.
//                 </Text>
//               </View>
//               {/* </View> */}
//             </>
//           ) : // ) : status === StateUpload.NoneUpload ? (
//           //   <View style={styles.view2} />
//           null}

//           {status === StateUpload.UploadFail ? (
//             // <View style={{ height: pxToPercentage(150) }}>
//             <>
//               <View style={styles.viewMessage}>
//                 {Close2Icon(styles.icon)}
//                 <Text numberOfLines={2} style={styles.txtStatusFail}>
//                   Upload failed. Please try again.
//                 </Text>
//               </View>
//               <>
//                 <Text style={styles.txtMessage}>
//                   Photos are stored locally until synchronizing and uploading to
//                   the server.
//                 </Text>
//                 <Text style={styles.txtMessage}>
//                   Photos are deleted upon successful upload.
//                 </Text>
//               </>
//               {/* </View> */}
//             </>
//           ) : // ) : status === StateUpload.NoneUpload ? (
//           //   <View style={styles.view2} />
//           null}
//           {status === StateUpload.Offline ? (
//             // <View style={{ height: pxToPercentage(150) }}>
//             <>
//               <View style={styles.viewMessage}>
//                 {Close2Icon(styles.icon)}
//                 <Text numberOfLines={2} style={styles.txtStatusOff}>
//                   Upload failed. Please check your Wi-Fi connection and try
//                   again.
//                 </Text>
//               </View>
//               <>
//                 <Text style={styles.txtMessage}>
//                   Images are stored under the Subject’s ID on the home screen
//                   pending a successful upload. Please contact support@belle.ai
//                   if you continue to have issues uploading images after
//                   confirming that your device is connected to Wi-Fi.
//                 </Text>
//                 <Text style={styles.txtMessage}>
//                   Photos are deleted upon successful upload.
//                 </Text>
//               </>
//               {/* </View> */}
//             </>
//           ) : // ) : status === StateUpload.NoneUpload ? (
//           //   <View style={styles.view2} />
//           null}
//         </View>
//         <View style={styles.viewBtnSave}>
//           <TouchableOpacity
//             style={
//               status === StateUpload.Uploading ||
//               status === StateUpload.UploadDone ||
//               listPartHasData.length !== 0
//                 ? styles.btnDisable
//                 : styles.btnSave
//             }
//             onPress={onUploadPress}
//             disabled={
//               status === StateUpload.Uploading ||
//               status === StateUpload.UploadDone ||
//               listPartHasData.length !== 0
//             }>
//             <Text style={styles.txtBtnBgWhite}>
//               {status === StateUpload.NoneUpload ||
//               (status === StateUpload.Uploading &&
//                 getCurrentStatus() !== StateUpload.UploadFail)
//                 ? 'UPLOAD PHOTOS NOW'
//                 : 'RETRY'}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={
//               status === StateUpload.NoneUpload ||
//               status === StateUpload.Uploading
//                 ? styles.btnCancel
//                 : styles.btnSave
//             }
//             onPress={onBackPress}
//             disabled={status === StateUpload.Uploading}>
//             <Text
//               style={
//                 status === StateUpload.NoneUpload ||
//                 status === StateUpload.Uploading
//                   ? styles.txtBtnBgBlue
//                   : styles.txtBtnBgWhite
//               }>
//               {status === StateUpload.NoneUpload ||
//               status === StateUpload.Uploading
//                 ? 'UPLOAD LATER'
//                 : 'FINISH'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollableAvoidKeyboard>
//     </ViewContainer>
//   );
// };

// const styles = StyleSheet.create({
//   inputSimpleBorder: {
//     marginBottom: pxToPercentage(8),
//     backgroundColor: 'white',
//     borderWidth: pxToPercentage(1),
//     borderColor: 'black',
//     padding: pxToPercentage(8),
//     paddingHorizontal: pxToPercentage(10),
//     textAlignVertical: 'top',
//     textDecorationLine: 'none',
//     fontSize: pxToPercentage(16),
//     color: themes['App Theme']['main-color-1'],
//     ...textStyle.montserratRegular,
//     width: pxToPercentage(350),
//     borderRadius: pxToPercentage(4),
//     alignSelf: 'center',
//     marginTop: pxToPercentage(8),
//   },
//   viewBtnSave: { alignItems: 'center', marginBottom: pxToPercentage(0) },
//   viewBodyPart: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   viewHr: {
//     backgroundColor: '#E9E8FB',
//     height: pxToPercentage(2),
//     width: pxToPercentage(317),
//     alignSelf: 'center',
//   },
//   flex1: { flex: 1 },
//   btnSave: {
//     backgroundColor: themes['App Theme']['app-txt-color-7'],
//     width: pxToPercentage(350),
//     height: pxToPercentage(41),
//     borderRadius: pxToPercentage(4),
//     justifyContent: 'center',
//     marginVertical: pxToPercentage(7.5),
//   },
//   txtPatient: {
//     ...textStyle.montserratRegular,
//     fontSize: pxToPercentage(20),
//     color: themes['App Theme']['app-txt-color-7'],
//     textAlign: 'center',
//     marginTop: pxToPercentage(8),
//     marginBottom: pxToPercentage(8),
//   },
//   btnDisable: {
//     backgroundColor: themes['App Theme']['button-disabled-color'],
//     width: pxToPercentage(350),
//     height: pxToPercentage(45),
//     borderRadius: pxToPercentage(4),
//     justifyContent: 'center',
//     marginVertical: pxToPercentage(7.5),
//   },
//   btnCancel: {
//     backgroundColor: themes['App Theme']['background-color-2'],
//     width: pxToPercentage(350),
//     height: pxToPercentage(45),
//     borderRadius: pxToPercentage(4),
//     justifyContent: 'center',
//     marginVertical: pxToPercentage(7.5),
//     borderWidth: pxToPercentage(1),
//     borderColor: themes['App Theme']['app-txt-color-7'],
//   },
//   txtBtnBgWhite: {
//     textAlign: 'center',
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(15),
//     color: themes['App Theme']['background-color-2'],
//   },
//   txtBtnBgBlue: {
//     textAlign: 'center',
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(15),
//     color: themes['App Theme']['app-txt-color-7'],
//   },
//   viewItem: {
//     flexDirection: 'column',
//     margin: 10,
//     backgroundColor: 'red',
//     flex: 1,
//     height: pxToPercentage(181),
//   },
//   txtTitle: {
//     color: themes['App Theme']['main-color-2'],
//     ...textStyle.montserratSemiBold,
//     fontSize: pxToPercentage(24),
//     textAlign: 'center',
//     marginVertical: pxToPercentage(8),
//   },
//   btnItem: {
//     flexDirection: 'column',
//     marginHorizontal: pxToPercentage(7.5),
//     marginVertical: pxToPercentage(7.5),
//     backgroundColor: themes['App Theme']['main-color-2'],
//     height: pxToPercentage(181),
//     width: pxToPercentage(150),
//     borderRadius: pxToPercentage(4),
//     alignItems: 'center',
//   },
//   txtTitleBodyPart: {
//     color: 'white',
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(14),
//     textAlign: 'center',
//     marginVertical: pxToPercentage(7),
//   },
//   viewLoading: {
//     alignSelf: 'center',
//     marginTop: pxToPercentage(30),
//     width: pxToPercentage(186),
//     flexDirection: 'row',
//     height: pxToPercentage(120),
//   },
//   view1: {
//     height: pxToPercentage(30),
//   },
//   view2: {
//     height: pxToPercentage(60),
//   },
//   txtLoading: {
//     width: pxToPercentage(135),
//     fontSize: pxToPercentage(16),
//     ...textStyle.montserratMedium,
//     color: '#3A3379',
//     alignSelf: 'center',
//   },
//   indicator: { width: 53, alignSelf: 'center' },
//   icon: {
//     width: pxToPercentage(20),
//     height: pxToPercentage(20),
//   },
//   txtMessage: {
//     textAlign: 'center',
//     ...textStyle.montserratLight,
//     fontSize: pxToPercentage(14),
//     color: '#3A3379',
//     minWidth: pxToPercentage(335),
//     alignSelf: 'center',
//     marginHorizontal: pxToPercentage(16),
//     marginVertical: pxToPercentage(5),
//   },
//   viewMessageSucc: {
//     flex: 1,
//     alignSelf: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   viewMessage: {
//     alignSelf: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: pxToPercentage(4),
//     marginBottom: pxToPercentage(8),
//   },
//   txtStatus: {
//     width: pxToPercentage(206),
//     color: '#3A3379',
//     fontSize: pxToPercentage(16),
//     ...textStyle.montserratMedium,
//     marginLeft: pxToPercentage(15),
//   },
//   txtStatusOff: {
//     width: pxToPercentage(280),
//     color: '#3A3379',
//     fontSize: pxToPercentage(16),
//     ...textStyle.montserratMedium,
//     marginLeft: pxToPercentage(15),
//   },
//   txtStatusFail: {
//     width: pxToPercentage(160),
//     color: '#3A3379',
//     fontSize: pxToPercentage(16),
//     ...textStyle.montserratMedium,
//     marginLeft: pxToPercentage(15),
//   },
// });

// export default UpLoadPhoto;
