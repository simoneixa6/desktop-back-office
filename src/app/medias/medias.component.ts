import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Media} from '../models/Media';
import {MediaFile} from '../models/MediaFile';
import * as mime from 'mime-types';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.scss']
})

export class MediasComponent implements OnInit {

  medias: MatTableDataSource<Media> = new MatTableDataSource<Media>();
  columnsToDisplay = ['id', 'fileName', 'tempName', 'date', 'intervention_id', 'deleted', 'download'];

  constructor(private http: HttpClient) {
  }

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

  downloadMedia(id: string): void {
    this.http.get<MediaFile>('https://simon.biz/medias/' + id + '/file').subscribe(response => {
        console.log(response);

        const re = /(?:\.([^.]+))?$/;
        // @ts-ignore
        const extension = re.exec(response.fileName)[1];
        const mimeType = mime.lookup(extension);

        if (mimeType !== false)
        {
          console.log(extension);
          this.displayFile(response.fileData, mimeType);
        }
      },
      (error => {
        console.log('Erreur renvoyé par le serveur : ' + error);
      })
    );
  }

  displayFile(data: string, typeMime: string): void {
    console.log(typeMime);
    const dataBlob = this.b64toBlob(data, typeMime);
    const url = window.URL.createObjectURL(dataBlob);
    window.open(url);
  }

  b64toBlob(b64Data: string, contentType: string): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}


