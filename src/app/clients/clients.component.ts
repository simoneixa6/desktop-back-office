import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Client} from '../models/Client';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  columnsToDisplay: string[] = ['civility', 'name', 'lastname', 'company', 'companyStatus', 'phone', 'mail', 'addresses', 'firstVisitDate', 'how', 'why', 'problematic', 'deleted', 'id', 'delete'];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.http.get<Client[]>('https://simon.biz/clients').subscribe(response => {
        console.log(response);
        this.clients = new MatTableDataSource<Client>(response);
      },
      (error => {
        console.log('Erreur renvoyé par le serveur : ' + error);
      })
    );
  }

  deleteClient(id: string): void {
    this.http
      .delete('https://simon.biz/clientswr/' + id)
      .subscribe(
        () => {
          console.log('Suppression effectué !');
          this.getClients();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

}
