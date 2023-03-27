import { textStyle } from '../../../components';
import { pxToPercentage } from '../../../core/libs/utils';
import { themes } from '../../../core/themes';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';

interface ComponentProps extends TouchableOpacityProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  outline?: boolean;
}

export type ButtonProps = ComponentProps;

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { title, style, titleStyle, ...restProps } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      {...restProps}
      style={[
        styles.container,
        style,
        props.outline && styles.btnOutline,
        props.disabled && styles.btnDisabled,
      ]}>
      <Text
        style={[
          styles.txtTitle,
          titleStyle,
          props.outline && styles.txtTitleOutline,
          props.disabled && styles.txtTitleDisabled,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: pxToPercentage(41),
    borderRadius: pxToPercentage(4),
    paddingHorizontal: pxToPercentage(20),
    backgroundColor: themes['App Theme']['main-color-2'],
    borderWidth: pxToPercentage(1),
    borderColor: themes['App Theme']['main-color-2'],
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnOutline: {
    backgroundColor: themes['App Theme']['background-color-2'],
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: pxToPercentage(16),
    color: themes['App Theme']['main-text-color-1'],
    ...textStyle.montserratMedium,
  },
  txtTitleOutline: {
    color: themes['App Theme']['main-color-2'],
  },
  txtTitleDisabled: {
    // color: themes['App Theme']['main-text-color-2'],
  },
});
