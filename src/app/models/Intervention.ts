import {Client} from './Client';
import {Site} from './Site';
import {Status} from './Status';

export class Intervention {
  id: string;
  title: string;
  client: Client;
  user_id: string;
  description: string;
  address: Site;
  km: number;
  goKm: number;
  backKm: number;
  billNumber: string;
  billDate: string;
  paymentType: string;
  paymentDate: string;
  status: Status;
  deleted: boolean;

  constructor(id: string, title: string, client: Client, user_id: string, description: string, address: Site, km: number, goKm: number, backKm: number, billNumber: string, billDate: string, paymentType: string, paymentDate: string, status: Status, deleted: boolean) {
    this.id = id;
    this.title = title;
    this.client = client;
    this.user_id = user_id;
    this.description = description;
    this.address = address;
    this.km = km;
    this.goKm = goKm;
    this.backKm = backKm;
    this.billNumber = billNumber;
    this.billDate = billDate;
    this.paymentType = paymentType;
    this.paymentDate = paymentDate;
    this.status = status;
    this.deleted = deleted;
  }
}
