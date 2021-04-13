import {Component} from '@angular/core';
import {Jwt} from './jwt';
import {User} from './models/User';
import {AuthenticatedUser} from './models/AuthenticatedUser';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Back Office';
  url = 'https://simon.biz/authentication/authenticate';

  constructor(private http: HttpClient) {
    // Permet de mettre à jour le token au démarrage
    // this.updateToken();
  }

// Méthode permettant de récupérer un token et de mettre a jour le header d'options qui est commun a l'application
/*  public updateToken(): void {
    // A modifier pour ne pas avoir les identifiants en dur dans le code
    const user = new User('', '');
    this.http
      .post<AuthenticatedUser>(this.url, user)
      .subscribe(
        ( response ) => {
          console.log('Authentification réussie');
          Jwt.httpOptions.headers = Jwt.httpOptions.headers.set('Authorization', response.token );
        },
        (error) => {
          console.log(error);
        }
      );
  }*/
}
