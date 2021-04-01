import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Media} from '../models/Media';
import {MediaFile} from '../models/MediaFile';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmDeleteComponent} from '../dialogs/DialogConfirmDeleteComponent';
import {DialogErrorComponent} from '../dialogs/DialogErrorComponent';

// import * as mime from 'mime-types';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.scss']
})

export class MediasComponent implements OnInit {

  url = 'https://simon.biz/medias/';
  medias: MatTableDataSource<Media> = new MatTableDataSource<Media>();
  columnsToDisplay = [ 'id', 'fileName', 'tempName', 'mimeType', 'date', 'intervention_id', 'deleted', 'download', 'delete'];

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getMedias();
  }

  getMedias(): void {
    this.http.get<Media[]>(this.url).subscribe(response => {
        console.log(response);
        this.medias = new MatTableDataSource<Media>(response);
      },
      (error => {
        this.showErrorDialog(error);
      })
    );
  }

  downloadMedia(id: string): void {
    this.http.get<MediaFile>(this.url + id + '/file').subscribe(response => {
        console.log(response);
        this.displayFile(response.fileData, response.mimeType);
      },
      (error => {
        this.showErrorDialog(error);
      })
    );
  }

  deleteMedia(id: string): void {
    this.http
      .delete(this.url + id)
      .subscribe(
        () => {
          console.log('Suppression effectué !');
          this.getMedias();
        },
        (error) => {
          this.showErrorDialog(error);
        }
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

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        console.log('The dialog was closed and yes was clicked');
        this.deleteMedia(id);
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

export interface DialogError {
  status: string;
}

