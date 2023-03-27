export class PredictParamModel {
  uri?: string;
  fileName?: string;
  visitDiagnosticId?: string;
  constructor(uri?: string, fileName?: string, visitDiagnosticId?: string) {
    this.visitDiagnosticId = visitDiagnosticId;
    this.uri = uri;
    this.fileName = fileName;
  }
}
export class PredictResponse {
  uploadted: boolean;
  constructor() {
    this.uploadted = false;
  }
}
