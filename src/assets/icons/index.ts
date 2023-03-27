import type { ImageStyle, StyleProp } from 'react-native';
import { Icon, IconElement, IconSource } from './icon.component';
export { Icon, RemoteIcon } from './icon.component';
export type { IconSource } from './icon.component';

export const ExampleIcon = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./source/'),
  };

  return Icon(source, style);
};

