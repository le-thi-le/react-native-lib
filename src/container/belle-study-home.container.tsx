import React from 'react';
import { Text, View } from 'react-native';

export interface AcneResultComponentProps {
  studyAddress: string;
  aiGetToken: string;
}

type Props = AcneResultComponentProps;

export const BelleStudyHomeContainer: React.FunctionComponent<Props> = (props) => {
  return <View>
    <Text> Belle Study</Text>
  </View>;
};
