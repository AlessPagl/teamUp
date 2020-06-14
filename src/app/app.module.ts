import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { PaginaProfiloComponent } from './pagina-profilo/pagina-profilo.component';
import { PaginaNonTrovataComponent } from './pagina-non-trovata/pagina-non-trovata.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    RegistrazioneComponent,
    PaginaProfiloComponent,
    PaginaNonTrovataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
