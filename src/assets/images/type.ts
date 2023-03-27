import type { ImageSourcePropType } from 'react-native';

export interface ImageSource {
  imageSource: ImageSourcePropType;
}

export class RemoteImage implements ImageSource {
  readonly source: string;

  constructor(source: string) {
    this.source = source;
  }

  get imageSource(): ImageSourcePropType {
    return { uri: this.source };
  }
}

export class Base64Image implements ImageSource {
  readonly source: string;

  constructor(source: string) {
    this.source = source;
  }

  get imageSource(): ImageSourcePropType {
    return { uri: `data:image/png;base64,${this.source}` };
  }
}
