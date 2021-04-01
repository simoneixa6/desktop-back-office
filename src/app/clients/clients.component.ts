import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Client} from '../models/Client';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmDeleteComponent} from '../dialogs/DialogConfirmDeleteComponent';
import {DialogErrorComponent} from '../dialogs/DialogErrorComponent';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  columnsToDisplay: string[] = ['civility', 'name', 'lastname', 'company', 'companyStatus', 'phone', 'mail', 'addresses', 'firstVisitDate', 'how', 'why', 'problematic', 'deleted', 'id', 'delete'];

  constructor(private http: HttpClient, public dialog: MatDialog) {
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
        this.showErrorDialog(error);
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
          this.showErrorDialog(error);
        }
      );
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        console.log('The dialog was closed and yes was clicked');
        this.deleteClient(id);
      } else {
        console.log('The dialog was closed and delete was canceled');
      }
    });
  }

  private showErrorDialog(error: any): void {
    const dialogRef = this.dialog.open(DialogErrorComponent, {
      width: '500px',
      data: {content: JSON.stringify(error)}
    });
  }

}
