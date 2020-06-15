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

  /* constructor(private authService: AuthService, public afAuth: AngularFireAuth, public router: Router) { this.navbar(); } */

  constructor(private router: Router) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'registrazione', component: RegistrazioneComponent },
    );
  }

  links: Array<{ text: string, path: string }>;


  ngOnInit(): void {
  }

  navbar(){
    console.log(this.afAuth.authState.subscribe((user)=>{console.log(user.uid)}));
  }

}
