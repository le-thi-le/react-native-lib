import axios, { Method } from 'axios';
import { store } from '../../../core/store';
import { encodeBase64 } from '../../../core/libs/utils';
import { ConfigServiceAddress } from '../models/config-service-url';
// import {
//   crashlyticsHelper,
//   LevelTypeEnum,
//   TypeError,
// } from '@src/core/libs/crashlytics-helper';

interface RequestHeader {
  Accept?: string;
  'Content-Type': string;
  Authorization?: string;
  'Accept-Language'?: string;
  'x-access-token'?: string;
  'Accept-Encoding'?: string;
  'Access-Control-Allow-Origin'?: string;
}

export default class ApiStudyService {
  configServerModel: ConfigServiceAddress;
  constructor(configServerModel: ConfigServiceAddress){
    this.configServerModel = configServerModel;
  }
  private ClientId = '66tqvbrk01fbq4jo72hr99oah7';
  private ClientSecret = 'nbubu3rt82puprufpg04l5836d3plghq3o6qg2btsrlidr6f8pj';
  // START - API all patients
  protected getBaseUrl(typeURL: TypeBaseUrlEnum): string {
    var baseURL = this.configServerModel.SERVER_ORG_ADDRESS_NEW;
    switch (typeURL) {
      case TypeBaseUrlEnum.AI: {
        baseURL = this.configServerModel.TOKEN_API_AI_URL;
        break;
      }
      case TypeBaseUrlEnum.IMAGE_QUALITY: {
        baseURL = this.configServerModel.IMAGE_QUALITY_URL;
        break;
      }
      case TypeBaseUrlEnum.ANALYTIC: {
        baseURL = this.configServerModel.ANALYTIC_URL;
        break;
      }
      default: {
        break;
      }
    }
    return baseURL;
  }
  protected apiGet<T>(
    url: string,
    params: object = {},
    hasToken: boolean = false,
    showSpinner?: boolean,
    contentType?: ContentTypeEnum,
    authenType?: AuthenTypeEnum,
  ): Promise<T> {
    return this.apiRun<T>(
      'get',
      url,
      null,
      params,
      hasToken,
      showSpinner,
      contentType,
      authenType,
    );
  }

  protected apiPost<T>(
    url: string,
    body: any = null,
    params: object = {},
    hasToken: boolean = false,
    showSpinner?: boolean,
    contentType?: ContentTypeEnum,
    authenType?: AuthenTypeEnum,
  ): Promise<T> {
    return this.apiRun<T>(
      'post',
      url,
      body,
      params,
      hasToken,
      showSpinner,
      contentType,
      authenType,
    );
  }

  protected apiPut<T>(
    url: string,
    body: any = null,
    params: object = {},
    hasToken: boolean = false,
    showSpinner: boolean = true,
    contentType?: ContentTypeEnum,
    authenType?: AuthenTypeEnum,
  ): Promise<T> {
    return this.apiRun<T>(
      'put',
      url,
      body,
      params,
      hasToken,
      showSpinner,
      contentType,
      authenType,
    );
  }

  protected apiDelete<T>(
    url: string,
    params: object = {},
    hasToken: boolean = true,
    showSpinner?: boolean,
    contentType?: ContentTypeEnum,
    authenType?: AuthenTypeEnum,
  ): Promise<T> {
    return this.apiRun<T>(
      'delete',
      url,
      null,
      params,
      hasToken,
      showSpinner,
      contentType,
      authenType,
    );
  }

  private apiRun<T>(
    method: Method,
    url: string,
    body: any = null,
    params: object = {},
    hasToken: boolean = false,
    showSpinner: boolean = false,
    contentType?: ContentTypeEnum,
    authenType?: AuthenTypeEnum,
  ): Promise<T> {
    if (showSpinner) {
      // store.dispatch(onSetVisibleSpinner(true));
    }
    // tslint:disable-next-line:no-console
    // __DEV__ && console.log(`${baseURL}` + url);

    return new Promise<T>((resolve, reject) => {
      axios({
        url,
        method,
        params,
        data: body,
        headers: this.appendHeaders(hasToken, contentType, authenType),
        timeout: 120000,
      })
        .then(({ data }) => {
          const value = JSON.stringify(data);
          if (!data?.success) {
            // crashlyticsHelper.logApiError(
            //   TypeError.APIError,
            //   url,
            //   method,
            //   data?.errorCode + ' message: ' + data?.message,
            //   body,
            //   params,
            //   this.appendHeaders(hasToken),
            // );
          } else {
            // crashlyticsHelper.logApiInfo(
            //   url,
            //   method,
            //   data,
            //   body,
            //   params,
            //   this.appendHeaders(hasToken),
            // );
          }

          return resolve(data);
        })
        .catch((error) => {
          // crashlyticsHelper.logApiError(
          //   TypeError.APIError,
          //   url,
          //   method,
          //   error,
          //   body,
          //   params,
          //   this.appendHeaders(hasToken),
          // );
          reject(error);
        })
        .finally(() => {
          if (showSpinner) {
            // store.dispatch(onSetVisibleSpinner(false));
          }
        });
    });
  }

  private appendHeaders(
    hasToken: boolean = false,
    contentType?: ContentTypeEnum,
    authenType?: AuthenTypeEnum,
  ): RequestHeader {
    const { session } = store.getState().session;
    const { languageKey } = store.getState().setting;
    const { accessToken } = store.getState().tokenAI;

    const headers: RequestHeader = {
      Accept: 'application/json',
      'Content-Type': ContentTypeValueEnum.Json,
    };

    if (hasToken && session) {
      switch (authenType) {
        case AuthenTypeEnum.BasicToken: {
          const encode = encodeBase64(this.ClientId + ':' + this.ClientSecret);
          headers.Authorization = `Basic ${encode}`;
          break;
        }
        case AuthenTypeEnum.XAccessToken: {
          headers['x-access-token'] = accessToken;
          break;
        }
        default: {
          headers.Authorization = `${session.tokenType} ${session.idToken}`;
          headers['Accept-Language'] = languageKey;
          break;
        }
      }
    }
    switch (contentType) {
      case ContentTypeEnum.Urlencoded: {
        headers['Content-Type'] = ContentTypeValueEnum.Urlencoded;
        break;
      }
      case ContentTypeEnum.formData: {
        headers['Content-Type'] = ContentTypeValueEnum.formData;
        break;
      }
      default: {
        headers['Content-Type'] = ContentTypeValueEnum.Json;
        break;
      }
    }
    return headers;
  }
}
export enum TypeBaseUrlEnum {
  ORG,
  AI,
  IMAGE_QUALITY,
  ANALYTIC,
}
enum ContentTypeValueEnum {
  Json = 'application/json',
  Urlencoded = 'application/x-www-form-urlencoded;charset=UTF-8',
  formData = 'multipart/form-data',
}

export enum ContentTypeEnum {
  Json,
  Urlencoded,
  formData,
}
export enum AuthenTypeEnum {
  BearerToken,
  BasicToken,
  XAccessToken,
}
