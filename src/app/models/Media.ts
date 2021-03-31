export class Media {
  id: string;
  intervention_id: string;
  date: string;
  tempName: string;
  fileName: string;
  deleted: boolean;

  constructor(id: string, intervention_id: string, date: string, tempName: string, fileName: string, deleted: boolean) {
    this.id = id;
    this.intervention_id = intervention_id;
    this.date = date;
    this.tempName = tempName;
    this.fileName = fileName;
    this.deleted = deleted;
  }
}
