import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InterventionsComponent} from './interventions/interventions.component';
import {ClientsComponent} from './clients/clients.component';
import {MediasComponent} from './medias/medias.component';
import {DialogConfirmDeleteComponent} from './dialogs/DialogConfirmDeleteComponent';
import {DialogErrorComponent} from './dialogs/DialogErrorComponent';

import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {Routes, RouterModule} from '@angular/router'; // CLI imports router
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  { path: 'backoffice', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    InterventionsComponent,
    ClientsComponent,
    MediasComponent,
    DialogConfirmDeleteComponent,
    DialogErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
