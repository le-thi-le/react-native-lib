// import React, { useEffect, useRef, useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { textStyle, ViewContainer } from '../../../../components';
// import { CheckedIcon, Close2Icon } from '../../../../assets/icons';
// import { themes } from '../../../../core/themes';
// import { isEmpty, pxToPercentage } from '../../../../core/libs/utils';
// import { CameraViewComponent } from '../study-camera/study-camera-view.component';
// import { useDispatch, useSelector } from 'react-redux';
// import { onThunkReviewImage } from './store/thunk';
// import { fileHelper, saveImagePath } from '../../../../core/libs/file-helper';

// import { Button } from '../../components/study-button-component';
// import {
//   ImageModel,
//   StudyAppBodyRegionModel,
//   SubjectModel,
// } from '../../models/subject/subject.model';
// import { VisitDetailParam } from '../../models/study.model';
// import {
//   BodyPartEnum,
//   PreViewState,
//   StateUpload,
//   TypeLoadUploadMiniAppEnum,
// } from '../../constants/study-constants';
// import { TopNavigationBar } from '../../components/top-navigation-bar.component';
// import { updateLocalSubject } from '../study-subject-list/store/reducer/action';
// import { StudyAppState } from '../study-subject-list/store/reducer/types';
// import { AppState } from '../../../../core/store';
// // import { analyticsHelper } from '../../../../../../core/libs/analytic-helper';
// // import { crashlyticsHelper } from '../../../../core/libs/crashlytics-helper';
// // import { EventNameEnum } from '../../../../core/libs/constants';

// interface ComponentProps {
//   onRightIconPress: () => void;
//   appName: string;
//   isOnlyStudyMiniApp: boolean;
//   onSaveImagePress: (list: StudyAppBodyRegionModel[]) => void;
//   param: VisitDetailParam;
// }

// export type PreviewProps = ComponentProps;

// export const PreviewComponent: React.FunctionComponent<PreviewProps> = (
//   props,
// ) => {
//   // console.log('parma', props.param);
//   const [currentItem, setValueImage] = React.useState<StudyAppBodyRegionModel>(
//     new StudyAppBodyRegionModel(props.param.bodyPart, props.param.imageBase64),
//   );
//   const [currentBodyPath, setBodyPath] = React.useState(props.param.bodyPart);
//   const [currentRegionName, setRegionName] = React.useState('');
//   const dispatch = useDispatch();

//   const [typeView, setType] = React.useState(props.param.type);
//   const [isReview, setIsReview] = React.useState(
//     props.param.type === TypeLoadUploadMiniAppEnum.Camera ? false : true,
//   );
//   const { subjects }: StudyAppState = useSelector(
//     (state: AppState) => state.studyMiniApp,
//   );
//   const listImage = useRef<StudyAppBodyRegionModel[]>(
//     props.param.listBodyRegion,
//   );
//   const [currentStatePreview, setState] = useState<PreViewState>(
//     props.param.previewState,
//   );
//   const [messageCheck, setMessage] = useState(props.param.messagePreviewFail);
//   const setMessageFail = (message: string) => {
//     if (checkFullImage() && !isEmpty(message) && !message.includes('offline')) {
//       if (message.includes('lighting')) {
//         return 'Please review lighting conditions and ensure that your image is not too bright or too dark. Press “RETAKE” to try again.\n\nOr, press “ACCEPT - CONTINUE TO UPLOAD” if you continue to receive this message despite attempts to address lighting conditions.';
//       } else if (message.includes('focus')) {
//         return 'Your image appears to be out of focus. Please press “RETAKE” to try again.\n\nOr, press “ACCEPT - CONTINUE TO UPLOAD” if you continue to receive this message despite attempts to address image quality.';
//       } else {
//         return 'Please press “RETAKE” to try again.\n\nOr, press “ACCEPT - CONTINUE TO UPLOAD” if you continue to receive this message despite attempts to address image quality.';
//       }
//     } else {
//       return message;
//     }
//   };
//   //log screen
//   useEffect(() => {
//     typeView === TypeLoadUploadMiniAppEnum.Preview
//       ? analyticsHelper.logScreen('preview', 'preview')
//       : analyticsHelper.logScreen('camera', 'camera');
//   }, []);
//   useEffect(() => {
//     if (
//       typeView === TypeLoadUploadMiniAppEnum.Preview &&
//       !isEmpty(currentItem.imageValue) &&
//       !isReview
//     ) {
//       setMessage('');
//       setState(PreViewState.Loading);
//       dispatch(
//         onThunkReviewImage(
//           currentItem,
//           props.param.subjectId,
//           //onPreview Done
//           (status: PreViewState, message: string) => {
//             console.log(
//               'status: PreViewState, message: string',
//               `${status} + ${message}`,
//             );
//             setState(status);
//             setMessage(message);
//             currentItem.previewState = status;
//             currentItem.messageUploadFail = message;
//           },
//           //onPreview fail
//           (message: string) => {
//             setState(PreViewState.PreviewFail);
//             if (message.includes('Network Error')) {
//               setMessage('Image quality cannot be check while you are offline');
//             } else {
//               setMessage(
//                 'Please press “RETAKE” to try again.\n\nOr, press “ACCEPT - CONTINUE TO NEXT PHOTO” if you continue to receive this message despite attempts to address image quality.',
//               );
//             }
//             currentItem.previewState = PreViewState.PreviewFail;
//           },
//         ),
//       );
//     }
//   }, [currentItem]);
//   // const onLoadFinish = () => {
//   //   if (props.type === TypeLoadUploadMiniAppEnum.Preview) {
//   //     dispatch(onSetVisibleSpinner(false));
//   //   }
//   // };
//   // const onLoadStart = () => {
//   //   if (props.type === TypeLoadUploadMiniAppEnum.Preview) {
//   //     dispatch(onSetVisibleSpinner(true));
//   //   }
//   // };
//   /*
//     save image when take photo done from camera
//    */
//   const onSaveImage = async (
//     path: string,
//     imageBase64: string,
//     bodyPart: number,
//   ) => {
//     const index = listImage.current.findIndex(
//       (item) => item.bodyPart === bodyPart,
//     );
//     // TODO lele save tem image to local
//     try {
//       // const value = await CameraConfig.getCachedFile(
//       //   props.param.subjectId,
//       //   bodyPart.toString(),
//       //   true,
//       //   true,
//       //   true,
//       // );
//       // const value1 = await CameraConfig.getPathCacheFile(
//       //   props.param.subjectId,
//       //   bodyPart.toString(),
//       //   false,
//       // );
//       // await fileHelper.saveBase64ImageForStudy(
//       //   props.param.subjectId,
//       //   bodyPart,
//       //   false,
//       // );
//       // const param: ImageModel = new ImageModel(bodyPart, path);
//       // const item = subjects.filter(
//       //   (e) => e.patientId === props.param.subjectId,
//       // );
//       // console.log('item', item[0]);
//       const indexNewItem = subjects.findIndex(
//         (e) => e.patientId === props.param.subjectId,
//       );
//       // const imageItem = item[0]?.image ?? [];
//       // if (imageItem.findIndex((e) => e.bodyPart === param.bodyPart) === -1) {
//       //   imageItem.push(param);
//       // }
//       // item[0].image = imageItem;
//       dispatch(
//         updateLocalSubject(
//           subjects.splice(
//             indexNewItem,
//             1,
//             await saveImagePath(
//               bodyPart,
//               props.param.subjectId,
//               subjects,
//               path,
//             ),
//           ),
//         ),
//       );
//       setType(TypeLoadUploadMiniAppEnum.Preview);
//       var content = new StudyAppBodyRegionModel(bodyPart, imageBase64);
//       content.path = await fileHelper.getCacheFilePath(
//         bodyPart,
//         props.param.subjectId,
//         true,
//       );
//       listImage.current[index] = content;
//       setValueImage(content);
//     } catch (error) {
//       __DEV__ && console.log(error);
//     }
//   };
//   /*
//     check all field has image
//    */
//   const checkFullImage = () => {
//     var bodyPartFullImage = listImage.current.find((item) =>
//       isEmpty(item.imageValue),
//     );
//     return isEmpty(bodyPartFullImage);
//   };
//   /* handle button save and continue
//      if full then open upload screen else take photo continue
//    */
//   const onSaveImagePress = () => {
//     // crashlyticsHelper.logEvent('preview', EventNameEnum.pressSave);
//     setState(PreViewState.Loading);
//     setIsReview(false);
//     if (checkFullImage()) {
//       props.onSaveImagePress(listImage.current);
//     } else {
//       const listSort = listImage.current.sort(function (a, b) {
//         return b.bodyPart - a.bodyPart;
//       });
//       for (let i = 0; i < listSort.length; i++) {
//         if (isEmpty(listSort[i].imageValue)) {
//           console.log('add', listSort[i].bodyPart);
//           setType(TypeLoadUploadMiniAppEnum.Camera);
//           setBodyPath(listSort[i].bodyPart);
//           setRegionName(getStringTitle(listSort[i].bodyPart));
//         }
//       }
//     }
//   };
//   const getStringTitle = (bodyPart: number) => {
//     switch (bodyPart) {
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
//   const onBackPress = () => {
//     // crashlyticsHelper.logEvent('preview', EventNameEnum.goBack);
//     props.onSaveImagePress(listImage.current);
//   };
//   const renderViewUpload = () => {
//     switch (currentStatePreview) {
//       case PreViewState.Loading: {
//         return (
//           <View style={styles.viewLoading}>
//             <ActivityIndicator
//               size="large"
//               color={'#3A3379'}
//               style={styles.indicator}
//             />
//             <Text style={styles.txtLoading}>Checking image quality.</Text>
//           </View>
//         );
//       }
//       case PreViewState.PreviewDone: {
//         return (
//           <View style={styles.viewMessageStatus}>
//             {CheckedIcon(styles.checkedIcon)}
//             <Text numberOfLines={3} style={styles.txtMessageStatus}>
//               Image quality is good. Proceed to next step.
//             </Text>
//           </View>
//         );
//       }
//       case PreViewState.PreviewFail: {
//         return (
//           <>
//             <View style={styles.viewMessageStatus}>
//               {Close2Icon(styles.checkedIcon)}
//               <Text numberOfLines={3} style={styles.txtMessageStatus}>
//                 Image does not pass the quality check.
//               </Text>
//             </View>
//             {!isEmpty(messageCheck) ? (
//               <Text numberOfLines={7} style={styles.txtMessage}>
//                 {setMessageFail(messageCheck ?? '')}
//               </Text>
//             ) : null}
//           </>
//         );
//       }
//       default:
//         return null;
//     }
//   };
//   const getStyleBtnFullImage = () => {
//     return styles.btnBgBlue;
//   };
//   const getStyleTxtFullImage = () => {
//     return styles.txtBtnBgBlue;
//   };
//   const getStyleBtn = (type: number) => {
//     switch (currentStatePreview) {
//       case PreViewState.PreviewDone: {
//         return type === 1 ? styles.btnBgBlue : styles.btnBgWhite; //1: btnSave,   2:btnRetake
//       }
//       case PreViewState.PreviewFail: {
//         return type === 1 ? styles.btnBgWhite : styles.btnBgBlue;
//       }
//       default:
//         return type === 1 ? styles.btnBgWhite : styles.btnBgBlue;
//     }
//   };
//   const getStyleTxt = (type: number) => {
//     switch (currentStatePreview) {
//       case PreViewState.PreviewDone: {
//         return type === 1 ? styles.txtBtnBgBlue : styles.txtBtnBgWhite;
//       }
//       case PreViewState.PreviewFail: {
//         return type === 1 ? styles.txtBtnBgWhite : styles.txtBtnBgBlue;
//       }
//       default:
//         return type === 1 ? styles.txtBtnBgWhite : styles.txtBtnBgBlue;
//     }
//   };
//   return (
//     <ViewContainer>
//       <TopNavigationBar
//         disabledLeftIcon={true}
//         title={'Belle Study™'}
//         onRightPress={props.onRightIconPress}
//       />
//       <Text style={styles.txtTitleBodyPart}>
//         {(typeView === TypeLoadUploadMiniAppEnum.Camera
//           ? 'Take Photo : '
//           : 'Review Photo : ') + getStringTitle(currentBodyPath)}
//       </Text>
//       {typeView === TypeLoadUploadMiniAppEnum.Camera ? (
//         <CameraViewComponent
//           regionName={currentRegionName}
//           bodyPart={currentBodyPath}
//           onSaveImage={onSaveImage}
//           subjectId={props.param.subjectId}
//           onCancelCamera={onBackPress}
//         />
//       ) : (
//         <>
//           <View style={styles.flex1}>
//             <View style={styles.viewHr} />
//             <View style={styles.viewContent}>
//               <Image
//                 source={{
//                   uri: `data:image/png;base64,${currentItem.imageValue}`,
//                 }}
//                 resizeMode="contain"
//                 style={styles.imgRegion}
//                 // onLoadEnd={onLoadFinish}
//                 // onLoadStart={onLoadStart}
//               />
//             </View>
//             {renderViewUpload()}
//           </View>
//           <View style={styles.viewBtn}>
//             <Button
//               style={checkFullImage() ? getStyleBtnFullImage() : getStyleBtn(2)}
//               titleStyle={
//                 checkFullImage() ? getStyleTxtFullImage() : getStyleTxt(2)
//               }
//               activeOpacity={0.75}
//               disabled={
//                 currentStatePreview === PreViewState.Loading ||
//                 props.param.stateBodyPart === StateUpload.UploadDone
//               }
//               title={'RETAKE'}
//               onPress={() => {
//                 // crashlyticsHelper.logEvent('preview', EventNameEnum.retake);
//                 setState(PreViewState.Loading);
//                 setIsReview(false);
//                 setType(TypeLoadUploadMiniAppEnum.Camera);
//               }}
//             />
//             <Button
//               style={checkFullImage() ? getStyleBtnFullImage() : getStyleBtn(1)}
//               activeOpacity={0.75}
//               disabled={currentStatePreview === PreViewState.Loading}
//               onPress={onSaveImagePress}
//               titleStyle={
//                 checkFullImage() ? getStyleTxtFullImage() : getStyleTxt(1)
//               }
//               title={
//                 checkFullImage()
//                   ? 'ACCEPT - CONTINUE TO UPLOAD'
//                   : 'ACCEPT - CONTINUE TO NEXT PHOTO'
//               }
//             />
//           </View>
//         </>
//       )}
//     </ViewContainer>
//   );
// };

// const styles = StyleSheet.create({
//   viewBtn: { alignItems: 'center', marginBottom: pxToPercentage(12) },
//   btnBgBlue: {
//     backgroundColor: themes['App Theme']['app-txt-color-7'],
//     width: pxToPercentage(350),
//     height: pxToPercentage(45),
//     borderRadius: pxToPercentage(4),
//     justifyContent: 'center',
//     marginVertical: pxToPercentage(7.5),
//   },
//   btnDisableBlue: {
//     backgroundColor: themes['App Theme']['app-txt-color-7'],
//     opacity: 0.6,
//     width: pxToPercentage(350),
//     height: pxToPercentage(45),
//     borderRadius: pxToPercentage(4),
//     justifyContent: 'center',
//     marginVertical: pxToPercentage(7.5),
//   },
//   btnDisableWhite: {
//     backgroundColor: themes['App Theme']['background-color-2'],
//     opacity: 0.6,
//     width: pxToPercentage(350),
//     height: pxToPercentage(45),
//     borderRadius: pxToPercentage(4),
//     justifyContent: 'center',
//     marginVertical: pxToPercentage(7.5),
//     borderWidth: pxToPercentage(1),
//     borderColor: themes['App Theme']['app-txt-color-7'],
//   },
//   btnBgWhite: {
//     backgroundColor: themes['App Theme']['background-color-2'],
//     width: pxToPercentage(350),
//     height: pxToPercentage(45),
//     borderRadius: pxToPercentage(4),
//     justifyContent: 'center',
//     marginVertical: pxToPercentage(7.5),
//     borderWidth: pxToPercentage(1),
//     borderColor: themes['App Theme']['app-txt-color-7'],
//   },
//   txtBtnBgBlue: {
//     textAlign: 'center',
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(15),
//     color: themes['App Theme']['background-color-2'],
//   },
//   txtBtnBgWhite: {
//     textAlign: 'center',
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(15),
//     color: themes['App Theme']['app-txt-color-7'],
//   },
//   txtTitleBtnDisCancel: {
//     textAlign: 'center',
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(15),
//     color: themes['App Theme']['background-color-2'],
//   },
//   viewContent: {
//     alignSelf: 'center',
//     backgroundColor: 'white',
//     height: pxToPercentage(338),
//     width: pxToPercentage(255),
//     shadowColor: 'white',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 10,
//     justifyContent: 'center',
//     marginTop: pxToPercentage(28),
//   },
//   viewHr: {
//     backgroundColor: '#E9E8FB',
//     height: pxToPercentage(2),
//     width: pxToPercentage(317),
//     alignSelf: 'center',
//   },
//   flex1: { flex: 1 },
//   viewMessageStatus: {
//     flexDirection: 'row',
//     marginHorizontal: pxToPercentage(100),
//     marginTop: pxToPercentage(30),
//   },
//   txtMessageStatus: {
//     ...textStyle.montserratSemiBold,
//     color: '#3A3379',
//     fontSize: pxToPercentage(18),
//   },
//   txtMessage: {
//     marginHorizontal: pxToPercentage(30),
//     marginTop: pxToPercentage(20),
//     ...textStyle.montserratRegular,
//     color: '#3A3379',
//     fontSize: pxToPercentage(14),
//     textAlign: 'center',
//   },
//   txtRetryText: {
//     textAlign: 'center',
//     marginHorizontal: pxToPercentage(40),
//     marginTop: pxToPercentage(10),
//     fontSize: pxToPercentage(14),
//     ...textStyle.montserratLight,
//   },
//   btnUpload: {
//     marginTop: pxToPercentage(32),
//     backgroundColor: '#AFADC9',
//     ...textStyle.montserratLight,
//     alignSelf: 'center',
//     height: pxToPercentage(45),
//     width: pxToPercentage(350),
//   },
//   btnUploadEnable: {
//     marginTop: pxToPercentage(32),
//     ...textStyle.montserratLight,
//     alignSelf: 'center',
//     height: pxToPercentage(45),
//     width: pxToPercentage(350),
//     fontSize: pxToPercentage(14),
//   },
//   btnRetake: {
//     marginTop: pxToPercentage(16),
//     // backgroundColor: '#AFADC9',
//     ...textStyle.montserratLight,
//     alignSelf: 'center',
//     height: pxToPercentage(45),
//     width: pxToPercentage(350),
//     fontSize: pxToPercentage(16),
//   },
//   txtTitleBodyPart: {
//     marginVertical: pxToPercentage(10),
//     color: themes['App Theme']['main-color-2'],
//     fontSize: pxToPercentage(18),
//     ...textStyle.montserratMedium,
//     textAlign: 'center',
//   },
//   imgRegion: {
//     // maxHeight: pxToPercentage(363),
//     // maxWidth: pxToPercentage(245),
//     height: pxToPercentage(363),
//     width: pxToPercentage(245),
//     alignSelf: 'center',
//   },
//   checkedIcon: {
//     width: pxToPercentage(24),
//     height: pxToPercentage(16),
//     right: pxToPercentage(10),
//     alignSelf: 'center',
//   },
//   viewLoading: {
//     alignSelf: 'center',
//     marginTop: pxToPercentage(30),
//     width: pxToPercentage(280),
//     flexDirection: 'row',
//   },
//   txtLoading: {
//     flex: 1,
//     fontSize: pxToPercentage(18),
//     ...textStyle.montserratSemiBold,
//     color: '#3A3379',
//   },
//   indicator: { width: 53, alignSelf: 'center' },
// });
