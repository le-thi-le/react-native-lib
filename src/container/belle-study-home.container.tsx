import React from 'react';
import { Text, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Router } from '../core/navigation';
import { NavigationService } from '../core/navigation/service';
import { persistor, store } from '../core/store';
import { ConfigServiceAddress } from './study/models/config-service-url';

export interface AcneResultComponentProps {
  configService: ConfigServiceAddress;
}

type Props = AcneResultComponentProps;

export const BelleStudyHomeContainer: React.FunctionComponent<Props> = (props) => {

  // return (<RootSiblingParent>
  // <Provider store={store}>
  //   <PersistGate loading={null} persistor={persistor}>
  //     <Router
  //       ref={(navigatorRef) => {
  //         if (navigatorRef) {
  //           NavigationService.setTopLevelNavigator(navigatorRef);
  //         }
  //       }}
  //     />

  //   </PersistGate>
  // </Provider>
  // </RootSiblingParent>);\
  return (<View><Text>dsfsdfsdfs</Text></View>)
};
