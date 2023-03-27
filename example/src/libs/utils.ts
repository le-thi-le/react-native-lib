import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const percentageWidth: number = width / 414; // default: 896 x 414

export const pxToPercentage = (value: number): number => {
  return percentageWidth * value;
};
