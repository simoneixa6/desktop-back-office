import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Intervention} from '../models/Intervention';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class InterventionsComponent implements OnInit {

  interventions: MatTableDataSource<Intervention> = new MatTableDataSource<Intervention>();
  columnsToDisplay = ['status' , 'title', 'client', 'user', 'description', 'periods' , 'km', 'billNumber', 'billDate', 'paymentType', 'paymentDate', 'id' , 'delete'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void{
    this.getInterventions();
  }

  getInterventions() : void {
    this.http.get<Intervention[]>('https://simon.biz/interventions').subscribe(response => {
        console.log(response);
        this.interventions = new MatTableDataSource<Intervention>(response);
      },
      (error => {
        console.log('Erreur renvoyé par le serveur : ' + error);
      })
    );
  }

  deleteIntervention(id: string): void {
    this.http
      .delete('https://simon.biz/interventionswr/' + id)
      .subscribe(
        () => {
          console.log('Suppression effectué !');
          this.getInterventions();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
