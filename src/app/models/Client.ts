import {Site} from './Site';

export class Client {
  _id: string;
  civility: string;
  name: string;
  lastname: string;
  company: string;
  companyStatus: string;
  phone: string;
  mail: string;
  addresses: Site[];
  firstVisitDate: string;
  how: string;
  why: string;
  problematic: boolean;
  deleted: boolean;

  constructor(id: string, civility: string, name: string, lastname: string, company: string, companyStatus: string, phone: string, mail: string, addresses: Site[], firstVisitDate: string, how: string, why: string, problematic: boolean, deleted: boolean) {
    this._id = id;
    this.civility = civility;
    this.name = name;
    this.lastname = lastname;
    this.company = company;
    this.companyStatus = companyStatus;
    this.phone = phone;
    this.mail = mail;
    this.addresses = addresses;
    this.firstVisitDate = firstVisitDate;
    this.how = how;
    this.why = why;
    this.problematic = problematic;
    this.deleted = deleted;
  }
}
