import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// Singleton permettant de rendre global le header coontenant le token d'authentificationoooo
export class Jwt {

  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'auth-token'
    })
  };
}
