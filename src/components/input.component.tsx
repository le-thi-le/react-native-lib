import React, { useState, useEffect } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { pxToPercentage } from '../core/libs/utils';
import { textStyle } from './text-style';
import { themes } from '../core/themes';


interface ComponentProps extends TextInputProps {
  inputContainerStyle?: StyleProp<ViewStyle>;
  onInputTextChange: (value: string | undefined) => void;
  editable?: boolean;
}

export type InputProps = ComponentProps;

export const Input: React.FC<InputProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(props.value);
  const editable = props.editable ?? true;
  const [securePassword, setSecurePassword] = useState<boolean | undefined>(
    props.secureTextEntry,
  );

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onInputTextChange = (text: string): void => {
    if (props.onInputTextChange) {
      setValue(text);
      props.onInputTextChange(text);
    }
  };

  const { inputContainerStyle, style, ...restProps } = props;

  return (
    <View
      style={[
        styles.container,
        props.secureTextEntry && styles.containerPassword,
        inputContainerStyle,
        // props.editable === false && styles.disabledContainer,
      ]}>
      <TextInput
        ref={(ref) =>
          ref &&
          ref.setNativeProps({ style: { ...textStyle.montserratRegular } })
        }
        autoCapitalize="none"
        value={value}
        editable={editable}
        style={[styles.input, style]}
        onChangeText={onInputTextChange}
        placeholderTextColor={themes['App Theme']['main-color-1']}
        maxLength={1000}
        underlineColorAndroid={'transparent'}
        {...restProps}
        secureTextEntry={securePassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: pxToPercentage(41),
    justifyContent: 'center',
    paddingHorizontal: pxToPercentage(16),
    backgroundColor: themes['App Theme']['input-background-color'],
    borderRadius: pxToPercentage(4),
    borderWidth: pxToPercentage(1),
    borderColor: themes['App Theme']['main-color-2'],
    flexDirection: 'row',
  },
  containerPassword: {
    paddingRight: pxToPercentage(0),
  },
  disabledContainer: {
    borderColor: themes['App Theme']['input-disabled-background-color'],
    backgroundColor: themes['App Theme']['input-disabled-background-color'],
  },
  input: {
    flex: 1,
    fontSize: pxToPercentage(16),
    color: themes['App Theme']['main-color-1'],
    ...textStyle.montserratRegular,
    padding: 0,
  },
  showPasswordIcon: {
    width: pxToPercentage(25),
  },
  viewLeftRight: {
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToPercentage(41),
    height: pxToPercentage(41),
  },
});
