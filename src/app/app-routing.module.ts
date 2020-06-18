import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { PaginaProfiloComponent } from './pagina-profilo/pagina-profilo.component';
import { RiepilogoProgettoComponent } from './riepilogo-progetto/riepilogo-progetto.component'; 
import { PaginaNonTrovataComponent } from './pagina-non-trovata/pagina-non-trovata.component';

const routes: Routes = [
  { path: "home", component: HomeComponent }, 
  { path: "", redirectTo: "/login", pathMatch: "full" }, 
  { path: "login", component: LoginComponent },
  { path: "registrazione", component: RegistrazioneComponent },
  { path: "pagina-profilo", component: PaginaProfiloComponent },
  { path: "riepilogo-progetto", component:RiepilogoProgettoComponent },
  { path: "**", component: PaginaNonTrovataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,
                                  LoginComponent,
                                  RegistrazioneComponent,
                                  PaginaProfiloComponent,
                                  RiepilogoProgettoComponent];