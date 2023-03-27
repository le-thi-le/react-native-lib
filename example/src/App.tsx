import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {BelleStudyHomeContainer } from 'react-native-belle-study'

export default function App() {
  // const [assessmentAndNotesValue, setAssessmentAndNotesValue] = React.useState<
  //   string | undefined
  // >(undefined);

  // const [index, setIndex] = React.useState<number>(0);

  return (
    <BelleStudyHomeContainer configService={{ANALYTIC_URL:'', IMAGE_QUALITY_URL:'', SERVER_ORG_ADDRESS_NEW : '', TOKEN_API_AI_URL:''}}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
});
