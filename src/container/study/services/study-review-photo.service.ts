import { Platform } from 'react-native';
import { APITokenAiResult } from '../models/api-id-repository.model';
import { ConfigServiceAddress } from '../models/config-service-url';
import ApiStudyService, {
  AuthenTypeEnum,
  ContentTypeEnum,
  TypeBaseUrlEnum,
} from './study-api.service';

export class ReviewPhotoService extends ApiStudyService {
  public static instance(configService: ConfigServiceAddress){
    return new ReviewPhotoService(configService);
  };
  private constructor(configService: ConfigServiceAddress) {
    super(configService);
  }
  public getToken() {
    const value = new URLSearchParams();
    value.append('grant_type', 'client_credentials');
    const url = this.getBaseUrl(TypeBaseUrlEnum.AI) + '/token';
    return this.apiPost<APITokenAiResult>(
      url,
      value,
      {},
      true,
      false,
      ContentTypeEnum.Urlencoded,
      AuthenTypeEnum.BasicToken,
    );
  }
  public imageQualityCheck(uri: string, fileName: string) {
    const data = new FormData();
    console.log('uri', uri);
    const fullPath = (Platform.OS === 'android' ? 'file://' : '') + uri;
    console.log(fullPath);
    data.append('image', {
      uri: fullPath,
      name: fileName,
      type: 'image/jpeg',
    });

    const url = this.getBaseUrl(TypeBaseUrlEnum.IMAGE_QUALITY) + '/predict';
    console.log(url);
    return this.apiPost<any>(
      url,
      data,
      {},
      true,
      false,
      ContentTypeEnum.formData,
      AuthenTypeEnum.XAccessToken,
    );
  }
  public imageQualityResult(id: string[]) {
    const url = this.getBaseUrl(TypeBaseUrlEnum.IMAGE_QUALITY) + '/get_results';
    const data = { ids: id };
    return this.apiPost<any>(
      url,
      data,
      {},
      true,
      false,
      ContentTypeEnum.Json,
      AuthenTypeEnum.XAccessToken,
    );
  }
  public getMessageReviewImage(qualityMes: string) {
    switch (qualityMes) {
      case 'too_blurry':
        // return I18n.t('home.msTooBlurry');
        return 'Your image is too blurry. Please try again.';
      case 'quality_too_blurry':
        // return I18n.t('home.msQualityTooBlurry');
        return 'Your image is too blurry. Please try again.';
      case 'quality_too_bad_luminosity':
        // return I18n.t('home.msQualityTooBadLuminosity');
        return 'There is too much light in your photo. Please adjust your lighting and try again.';
      case 'too_bad_luminosity':
        // return I18n.t('home.msTooBadLuminosity');
        return 'There is too much light in your photo. Please adjust your lighting and try again.';

      default:
        return '';
    }
  }
}
