import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Media} from '../models/Media';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.scss']
})

export class MediasComponent implements OnInit {

  medias: MatTableDataSource<Media> = new MatTableDataSource<Media>();
  columnsToDisplay = ['id', 'fileName', 'tempName', 'date', 'intervention_id', 'deleted'];

  constructor(private http: HttpClient) { }

    ngOnInit(): void {
      this.http.get<Media[]>('https://simon.biz/medias').subscribe(response => {
          console.log(response);
          this.medias = new MatTableDataSource<Media>(response);
        },
        (error => {
          console.log('Erreur renvoyé par le serveur : ' + error);
        })
      );
    }
}


