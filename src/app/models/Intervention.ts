import {Client} from './Client';
import {Site} from './Site';
import {Status} from './Status';
import {Period} from './Period';

export interface Intervention {
  id: string;
  title: string;
  client: Client;
  user_id: string;
  description: string;
  address: Site;
  periods: Period[];
  km: number;
  goKm: number;
  backKm: number;
  billNumber: string;
  billDate: string;
  paymentType: string;
  paymentDate: string;
  status: Status;
  deleted: boolean;


}
