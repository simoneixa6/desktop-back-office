import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Intervention} from '../models/Intervention';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogConfirmDeleteComponent} from '../dialogs/DialogConfirmDeleteComponent';
import {DialogErrorComponent} from '../dialogs/DialogErrorComponent';


@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss'],
})

export class InterventionsComponent implements OnInit {

  urlRead = 'https://simon.biz/interventions';
  urlWrite = 'https://simon.biz/interventionswr/';

  interventions: MatTableDataSource<Intervention> = new MatTableDataSource<Intervention>();
  columnsToDisplay = ['status', 'title', 'client', 'user', 'description', 'periods', 'address' , 'km', 'billNumber', 'billDate', 'paymentType', 'paymentDate', 'deleted' , 'id', 'delete'];

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getInterventions();
  }

  getInterventions(): void {
    this.http.get<Intervention[]>(this.urlRead).subscribe(response => {
        console.log(response);
        this.interventions = new MatTableDataSource<Intervention>(response);
      },
      (error => {
        this.showErrorDialog(error);
      })
    );
  }

  deleteIntervention(id: string): void {
    this.http
      .delete(this.urlWrite + id)
      .subscribe(
        () => {
          console.log('Suppression effectué !');
          this.getInterventions();
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
        this.deleteIntervention(id);
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

