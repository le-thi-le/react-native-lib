import type { ImageStyle, StyleProp } from 'react-native';
import { Icon, IconElement, IconSource } from './icon.component';
export { Icon, RemoteIcon } from './icon.component';
export type { IconSource } from './icon.component';

export const CloseIcon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/close.png'),
  };

  return Icon(source, style);
};
export const CheckedIcon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/checked.png'),
  };

  return Icon(source, style);
};
export const CheckedBoxIcon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/checkbox-checked.png'),
  };

  return Icon(source, style);
};

export const UnCheckedBoxIcon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/checkbox-unchecked.png'),
  };

  return Icon(source, style);
};

export const CloseIcon3 = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/iconclose_3.png'),
  };

  return Icon(source, style);
};

export const iconStepOne = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/step_one.png'),
  };
  return Icon(source, style);
};
export const iconStepTwo = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/step_two.png'),
  };
  return Icon(source, style);
};
export const iconStepThree = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/step_three.png'),
  };
  return Icon(source, style);
};
export const iconStepFour = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/step_four.png'),
  };
  return Icon(source, style);
};

export const Close2Icon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/close-2.png'),
  };

  return Icon(source, style);
};

export const ArrowDownIcon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/arrow-down.png'),
  };

  return Icon(source, style);
};

export const CloseIcon4 = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/xicon.png'),
  };

  return Icon(source, style);
};

export const FlashOnIcon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/flash_on_icon.png'),
  };

  return Icon(source, style);
};

export const FlashOffIcon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/flash_off_icon.png'),
  };

  return Icon(source, style);
};

export const FlashAutoIcon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/auto_flash_icon.png'),
  };

  return Icon(source, style);
};