import { Dimensions } from 'react-native';
import { BodyPartEnum } from '../../container/study/constants/study-constants';
import { Buffer } from 'buffer';
const { width } = Dimensions.get('window');
const percentageWidth: number = width / 414; // default: 896 x 414

export const pxToPercentage = (value: number): number => {
  return percentageWidth * value;
};

export const isEmpty = (value: any): boolean => {
  return (
    value === undefined ||
    value === '' ||
    value === null ||
    value === 'undefined'
  );
};

export const chunk = <T>(array: Array<T>, size: number): T[][] => {
  const chunkedArr: T[][] = [];
  const copied: T[] = [...array];
  const numOfChild: number = Math.ceil(copied.length / size);

  for (let i = 0; i < numOfChild; i++) {
    chunkedArr.push(copied.splice(0, size));
  }

  return chunkedArr;
};




export const getItemsResultAI = (data: any) => {
  const result = data;
  for (const key in result) {
    result[key].key = key;
  }
  return result;
};


export const truncateHeadString = (str: string | undefined, num: number) => {
  if (str && str.length > num) {
    return '...' + str.slice(str.length - num, str.length);
  } else {
    return str;
  }
};

export const getImageName = (bodyPart: number) => {
  switch (bodyPart) {
    case BodyPartEnum.UpperFront:
      return 'Upper Front.jpg';
    case BodyPartEnum.LowerFront:
      return 'Lower Front.jpg';
    case BodyPartEnum.UpperBack:
      return 'Upper Back.jpg';
    default:
      return 'Lower Back.jpg';
  }
};
export const encodeBase64 = (value: string) => {
  const buffer = Buffer.from(value, 'utf-8');
  return buffer.toString('base64');
};