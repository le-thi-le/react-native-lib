export class ApiResult {
  success: boolean;
  message?: string;
  errorCode?: string;
  response?: any;
  data?: any;
  items?: any;

  constructor() {
    this.success = false;
  }
}
