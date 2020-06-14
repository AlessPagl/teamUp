import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { PaginaProfiloComponent } from './pagina-profilo/pagina-profilo.component';
import { PaginaNonTrovataComponent } from './pagina-non-trovata/pagina-non-trovata.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" }, 
  { path: "login", component: LoginComponent },
  { path: "registrazione", component: RegistrazioneComponent },
  { path: "pagina-profilo", component: PaginaProfiloComponent },
  { path: "**", component: PaginaNonTrovataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,
                                  RegistrazioneComponent,
                                  PaginaProfiloComponent];