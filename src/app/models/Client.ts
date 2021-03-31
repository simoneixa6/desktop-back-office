import {Site} from './Site';

export interface Client {
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
}
