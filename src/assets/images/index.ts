import type { ImageSource } from './type';
export { RemoteImage } from './type';
export type { ImageSource } from './type';

export const imageDefaultAvatar: ImageSource = {
  imageSource: require('./source/default-avatar.png'),
};


export const imageUpperFront: ImageSource = {
  imageSource: require('./source/upperfront.png'),
};
export const imageUpperBack: ImageSource = {
  imageSource: require('./source/upperback.png'),
};
export const imageLowerFront: ImageSource = {
  imageSource: require('./source/lowerfront.png'),
};
export const imageLowerBack: ImageSource = {
  imageSource: require('./source/lowerback.png'),
};
