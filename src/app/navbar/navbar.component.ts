import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegistrazioneComponent } from '../registrazione/registrazione.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public logged = false;

  constructor(private authService: AuthService, public afAuth: AngularFireAuth, public router: Router) {
    this.isLogged()
  }

  links: Array<{ text: string, path: string }>;


  ngOnInit(): void {
  }

  /* PER CHIAMARE ID UTENTE */
  /* console.log(this.afAuth.authState.subscribe((user)=>{console.log(user.uid)})); */

  isLogged() {
    this.afAuth.authState.subscribe((user) => {
      if (user === null) {
        this.logged = false
      }
      else {
        this.logged = true
      }
    })
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }

}
