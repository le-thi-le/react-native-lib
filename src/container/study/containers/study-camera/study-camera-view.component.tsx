// import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
// import { textStyle } from '../../../../components';
// import { themes } from '../../../../core/themes';
// import { pxToPercentage } from '../../../../core/libs/utils';
// import I18n from 'i18n-js';
// // import { CameraView, DetectionMode } from 'react-native-study-camera';
// import {
//   CameraView,
//   DetectionMode,
//   FlashMode,
//   PhotoModel,
// } from 'react-native-belle-core';

// import LowerBack from '../../../../assets/images/source/Lower-Back.svg';
// import LowerFront from '../../../../assets/images/source/Lower-Front.svg';
// import UpperFront from '../../../../assets/images/source/Upper-Front.svg';
// import UpperBack from '../../../../assets/images/source/Upper-Back.svg';
// import React, { useRef, useState } from 'react';
// import {
//   FlashAutoIcon,
//   FlashOffIcon,
//   FlashOnIcon,
// } from '../../../../assets/icons';
// // import { crashlyticsHelper } from '../../../../core/libs/crashlytics-helper';
// // import { EventNameEnum } from '../../../../core/libs/constants';
// interface ComponentProps {
//   regionName: string;
//   bodyPart: number;
//   onSaveImage: (path: string, imageBase64: string, bodyPart: number) => void;
//   onCancelCamera: () => void;
//   subjectId: string;
// }

// export type PreviewProps = ComponentProps;

// export const CameraViewComponent: React.FunctionComponent<PreviewProps> = (
//   props,
// ) => {
//   const [disable, setDisable] = useState(false);
//   console.log('CameraViewComponent', props.regionName);
//   const cameraViewRef = useRef<CameraView | null>(null);
//   const onCaptured = (photoModels: PhotoModel[]) => {
//     setDisable(false);
//     props.onSaveImage(
//       photoModels[0]?.path,
//       photoModels[0]?.thumbnail ?? '',
//       props.bodyPart,
//     );
//   };
//   const [flash, setFlash] = React.useState(FlashMode.AUTO);
//   const getImage = (Part: number) => {
//     switch (Part) {
//       case 1:
//         return (
//           <UpperBack
//             height={pxToPercentage(427)}
//             width={pxToPercentage(440.8)}
//             style={styles.imgPreViewUpper}
//           />
//         );

//       case 2:
//         return (
//           <LowerFront
//             height={pxToPercentage(427)}
//             width={pxToPercentage(427.5)}
//             style={styles.imgPreViewLower}
//           />
//         );

//       case 3:
//         return (
//           <LowerBack
//             height={pxToPercentage(427)}
//             width={pxToPercentage(429.4)}
//             style={styles.imgPreViewLower}
//           />
//         );

//       default:
//         return (
//           <UpperFront
//             height={pxToPercentage(427)}
//             width={pxToPercentage(440.8)}
//             style={styles.imgPreViewUpper}
//           />
//         );
//     }
//   };
//   const onFlashButtonClick = () => {
//     switch (flash) {
//       case FlashMode.OFF:
//         setFlash(FlashMode.AUTO);
//         break;
//       case FlashMode.ON:
//         setFlash(FlashMode.OFF);
//         break;
//       default:
//         setFlash(FlashMode.ON);
//         break;
//     }
//     // if (flash === FlashMode.ON) {
//     //   setFlash(FlashMode.OFF);
//     // } else {
//     //   setFlash(FlashMode.ON);
//     // }
//     // setEnableFlash((prevState) => !prevState);
//   };

//   return (
//     <View style={styles.flex1}>
//       <View style={styles.camContainer}>
//         <CameraView
//           onRef={(ref) => (cameraViewRef.current = ref)}
//           style={styles.camBox}
//           folderName={props.subjectId}
//           fileName={props.bodyPart.toString()}
//           visualMask={false}
//           facing={false}
//           flash={flash}
//           detectionMode={DetectionMode.NONE}
//           onCaptured={(photoModels) => onCaptured(photoModels)}
//           createThumb={true}
//           encryptOutput={true}
//           indicatorEnabled={true}
//           // onCaptured={
//           //   (event) => onCaptured(event.nativeEvent.imageBase64)
//           // }
//         />
//         {getImage(props.bodyPart)}
//         <TouchableOpacity
//           activeOpacity={0.75}
//           onPress={onFlashButtonClick}
//           style={{
//             position: 'absolute',
//             top: pxToPercentage(10),
//             left: pxToPercentage(20),
//           }}>
//           {flash === FlashMode.ON
//             ? FlashOnIcon(styles.iconFlash)
//             : flash === FlashMode.OFF
//             ? FlashOffIcon(styles.iconFlash)
//             : FlashAutoIcon(styles.iconFlash)}
//           {/* {FlashIcon([
//             styles.iconFlash,
//             {
//               tintColor:
//                 flash === FlashMode.AUTO
//                   ? themes['App Theme']['app-txt-color-3']
//                   : flash === FlashMode.OFF
//                   ? themes['App Theme']['flash-disable-color']
//                   : themes['App Theme']['flash-enable-color'],
//             },
//           ])} */}
//         </TouchableOpacity>
//         <View style={styles.viewBtnCam}>
//           <TouchableOpacity
//             style={{ marginTop: pxToPercentage(64) }}
//             disabled={disable}
//             onPress={() => {
//               // crashlyticsHelper.logEvent(
//               //   'camera view',
//               //   EventNameEnum.shootImage,
//               // );
//               setDisable(true);
//               if (cameraViewRef.current != null) {
//                 cameraViewRef.current.capturePhoto();
//               } else {
//                 setDisable(false);
//               }
//             }}>
//             <Image
//               source={require('../../../../../assets/images/source/cameraButton.png')}
//               style={{
//                 width: pxToPercentage(65),
//                 height: pxToPercentage(65),
//               }}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={props.onCancelCamera}
//             style={styles.btnCancel}>
//             <Text style={styles.txtCancel}>
//               {I18n.t('home.cancel').toUpperCase()}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   iconFlash: {
//     width: pxToPercentage(30),
//     height: pxToPercentage(30),
//     tintColor: 'white',
//   },
//   imgPreViewUpper: {
//     position: 'absolute',
//     bottom: pxToPercentage(400),
//   },
//   imgPreViewLower: {
//     position: 'absolute',
//     bottom: pxToPercentage(400),
//   },
//   flex1: {
//     flex: 1,
//   },
//   camera: {
//     height: pxToPercentage(1),
//   },
//   camContainer: {
//     width: pxToPercentage(414),
//     height: pxToPercentage(896),
//     alignItems: 'center',
//   },
//   camBox: {
//     width: pxToPercentage(414),
//     height: pxToPercentage(552),
//   },
//   camButtons: {
//     position: 'absolute',
//     zIndex: 999,
//   },
//   viewBtnCam: {
//     flex: 1,
//     width: pxToPercentage(414),
//     backgroundColor: themes['App Theme']['main-color-1'],
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   txtCancel: {
//     color: 'white',
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(14),
//   },
//   btnCancel: { position: 'absolute', right: 30, top: 83 },
//   txtTitleBodyPart: {
//     color: themes['App Theme']['main-color-2'],
//     ...textStyle.montserratMedium,
//     fontSize: pxToPercentage(18),
//     textAlign: 'center',
//     marginVertical: pxToPercentage(12),
//   },
// });
