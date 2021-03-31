import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Intervention} from '../models/Intervention';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss']
})

export class InterventionsComponent implements OnInit {


  interventions: MatTableDataSource<Intervention> = new MatTableDataSource<Intervention>();
  columnsToDisplay = ['id', 'status' , 'title', 'client', 'user', 'description', 'km', 'billNumber', 'billDate', 'paymentType', 'paymentDate'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void{
    this.http.get<Intervention[]>('https://simon.biz/interventions').subscribe(response => {
        console.log(response);
        this.interventions = new MatTableDataSource<Intervention>(response);
      },
      (error => {
        console.log('Erreur renvoyé par le serveur : ' + error);
      })
    );
  }
}
