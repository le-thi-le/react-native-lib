// import { ParamNavigatorEnum, RouteNameEnum } from '../../../../core/libs/constants';
// import React, { useEffect } from 'react';
// import { NavigationInjectedProps } from 'react-navigation';
// import { useDispatch } from 'react-redux';
// import { PreviewComponent } from './study-preview.component';
// import { onThunkGetTokenAI } from './store/thunk';
// import { VisitDetailParam } from '../../models/study.model';
// import {
//   StudyMiniAppParam,
//   TypeLoadUploadMiniAppEnum,
// } from '../../constants/study-constants';
// import { StudyAppBodyRegionModel } from '../../models/subject/subject.model';
// // import { crashlyticsHelper } from '@src/core/libs/crashlytics-helper';

// export const PreviewContainer: React.FunctionComponent<
//   NavigationInjectedProps
// > = (props) => {
//   const navigationKey = 'miniAppContainer';
//   const param: VisitDetailParam = props.navigation.getParam(
//     StudyMiniAppParam.VisitDetail,
//   ) as VisitDetailParam;
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (param.type !== TypeLoadUploadMiniAppEnum.Preview) {
//       dispatch(onThunkGetTokenAI());
//     }
//   }, []);

//   const onRightButtonPress = () => {
//     // crashlyticsHelper.logEvent('Preview', 'open setting');

//     props.navigation.navigate({
//       key: navigationKey,
//       routeName: 'StudySetting',
//       params: {
//         [ParamNavigatorEnum.NavigatorType]: RouteNameEnum.MiniApp,
//       },
//     });
//   };

//   const onSaveImage = (list: StudyAppBodyRegionModel[]) => {
//     const rollback = props.navigation.getParam(StudyMiniAppParam.RollBack);
//     if (typeof rollback === 'function') {
//       rollback(param.subjectId, param.studyId, list);
//     }
//     props.navigation.goBack();
//     // props.navigation.state.params?.onRollBack(list);
//   };
//   return (
//     <PreviewComponent
//       onSaveImagePress={onSaveImage}
//       onRightIconPress={onRightButtonPress}
//       appName={props.navigation.state.params?.appName}
//       isOnlyStudyMiniApp={props.navigation.state.params?.isOnlyStudyMiniApp}
//       param={param}
//     />
//   );
// };
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

export const PreviewContainer: React.FunctionComponent<
  NavigationInjectedProps
> = (props) => {
  const navigationKey = 'PreviewContainer';
 const back = () =>{
  props.navigation.goBack();
 }

  return <View style={{justifyContent: 'center'}}>
    <TouchableOpacity onPress={back}>
        <View style={{width: 100, height: 100 , backgroundColor:'Blue'}}> <Text>back</Text></View>
    </TouchableOpacity>
  </View>;
};
