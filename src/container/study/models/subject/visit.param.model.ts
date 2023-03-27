import { dateToYYYYmmDDFormatter } from '../../../../core/libs/formatters';

export class VisitParamModel {
  studyId: string;
  isCreateSubject: boolean;
  isCreateVisit: boolean;
  subject: string;
  visitDate: string;
  siteName?: string;
  notes?: string;
  byStudy: boolean;
  constructor(
    subjectId: string,
    studyId: string,
    isCreateSubject?: boolean,
    siteName?: string,
    notes?: string,
  ) {
    this.studyId = studyId;
    this.subject = subjectId;
    this.isCreateSubject = isCreateSubject ?? false;
    this.isCreateVisit = true;
    this.visitDate = dateToYYYYmmDDFormatter(new Date());
    this.siteName = siteName ?? '';
    this.notes = notes ?? '';
    this.byStudy = true;
  }
}
