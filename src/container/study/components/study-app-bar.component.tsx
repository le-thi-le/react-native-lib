// import React, { useEffect, useState } from 'react';
// import {
//   Image,
//   ImageProps,
//   ImageStyle,
//   Keyboard,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import { pxToPercentage } from '../../../core/libs/utils';
// import { textStyle, viewStyle } from '../../../components';
// import { themes } from '../../../core/themes';
// import { useSelector } from 'react-redux';
// import { AppState } from '../../../core/store';
// import { imageDefaultAvatar, RemoteImage } from '../../../assets/images';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
// import { SafeAreaView } from 'react-navigation';

// export interface ComponentProps {
//   onRightPress?: () => void;
//   disabledRightIconAvatar?: boolean;
//   title: string;
//   leftIcon?: IconProp;
//   rightText?: string;
//   onLeftPress?: () => void;
//   disabledLeftIcon?: boolean;
// }
// type IconProp = (style: ImageStyle) => React.ReactElement<ImageProps>;
// export type MiniAppStudyHeaderProps = ComponentProps;

// export const MiniAppStudyHeader: React.FunctionComponent<
//   MiniAppStudyHeaderProps
// > = (props) => {
//   const onRightButtonPress = () => {
//     if (props.onRightPress) {
//       props.onRightPress();
//     }
//   };
//   const { user } = useSelector((state: AppState) => state.session);
//   const [avatarComponent, setAvatarComponent] = useState<React.ReactElement>(
//     <View />,
//   );

//   useEffect(() => {
//     if (user.avatarUrl) {
//       setAvatarComponent(
//         <Image
//           style={styles.imageStyle}
//           source={
//             new RemoteImage(`${user.avatarUrl}?key=${Date.now()}`).imageSource
//           }
//         />,
//       );
//     } else {
//       setAvatarComponent(
//         <Image
//           key={Date.now()}
//           style={styles.imageStyle}
//           source={imageDefaultAvatar.imageSource}
//         />,
//       );
//     }
//   }, [user.avatarUrl]);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={styles.container}>
//         <SafeAreaView style={styles.safeAreaView} />
//         <View style={styles.viewHeader}>
//           <View style={styles.viewLeft}>
//             {props.leftIcon && (
//               <TouchableOpacity
//                 style={styles.viewLeft}
//                 activeOpacity={0.75}
//                 onPress={props.onLeftPress}
//                 disabled={props.disabledLeftIcon}>
//                 {props.leftIcon(styles.icon)}
//               </TouchableOpacity>
//             )}
//           </View>
//           <View style={styles.viewCenter}>
//             <Text numberOfLines={2} style={styles.txtTitle}>
//               {props.title}
//             </Text>
//           </View>

//           <View style={styles.viewRight}>
//             {!props.disabledRightIconAvatar && (
//               <TouchableOpacity
//                 activeOpacity={0.75}
//                 onPress={onRightButtonPress}
//                 disabled={props.disabledRightIconAvatar}>
//                 {avatarComponent}
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   icon: {
//     width: pxToPercentage(24),
//     height: pxToPercentage(20),
//   },
//   container: {
//     ...viewStyle.shadow,
//     backgroundColor: themes['App Theme']['background-color-7'],
//     borderBottomLeftRadius: pxToPercentage(10),
//     borderBottomRightRadius: pxToPercentage(10),
//   },
//   safeAreaView: {
//     paddingTop: getStatusBarHeight(false),
//   },
//   viewHeader: {
//     flexDirection: 'row',
//     height: pxToPercentage(55),
//     paddingHorizontal: pxToPercentage(18),
//   },
//   viewCenter: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   viewLeft: {
//     flex: 1,
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     width: pxToPercentage(79.99),
//     height: pxToPercentage(55),
//   },
//   viewRight: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     width: pxToPercentage(54),
//     height: pxToPercentage(55),
//   },
//   imageStyle: {
//     width: pxToPercentage(30),
//     height: pxToPercentage(30),
//     borderRadius: pxToPercentage(30),
//   },
//   txtTitle: {
//     textAlign: 'center',
//     fontSize: pxToPercentage(20),
//     color: themes['App Theme']['main-color-1'],
//     ...textStyle.montserratMedium,
//   },
// });
