export class APITokenAiResult {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
}

export class QualityImageApiResult {
  id?: string;

  constructor() {
    this.id = '';
  }
}
export class ResultQualityCheckModel {
  message?: any;
  status?: string;
  log_msg?: string;
}
