import React from 'react';
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';

interface ComponentProps extends ViewProps {
  example?: any;
}

export type ViewContainerProps = ComponentProps;

export const ViewContainer: React.FunctionComponent<ViewContainerProps> = (
  props,
) => {
  const { style, ...restProps } = props;

  return (
    <View style={styles.container}>
      {/* <SafeAreaView style={styles.safeAreaView} /> */}
      <View {...restProps} style={[styles.viewContent, style]}>
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // safeAreaView: {
  //   backgroundColor: themes['App Theme']['background-color-2'],
  //   paddingTop: getStatusBarHeight(false),
  // },
  viewContent: {
    flex: 1,
  },
});
