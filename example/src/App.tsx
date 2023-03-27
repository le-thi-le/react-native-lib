import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {BelleStudyHomeContainer } from 'react-native-belle-study'

export default function App() {
  // const [assessmentAndNotesValue, setAssessmentAndNotesValue] = React.useState<
  //   string | undefined
  // >(undefined);

  // const [index, setIndex] = React.useState<number>(0);

  return (
    <BelleStudyHomeContainer studyAddress={''} aiGetToken={''}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
});
