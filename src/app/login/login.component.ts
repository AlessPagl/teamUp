import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  /* public tipo="password";

  showPwd() {
    
    if (this.tipo === "password") {
      this.tipo = "text";
    } else {
      this.tipo = "password";
    }
  } */

  constructor(private authService: AuthService, public afAuth: AngularFireAuth, public router: Router) {
    
    this.afAuth.signOut().then(()=>{this.afAuth.authState.subscribe((user) => {
      if (user!= null)
        this.router.navigate(['/home']);
    })});
 
  }

  public utente = { email: "", password: "" };

  async login() {

    var result = await this.afAuth.signInWithEmailAndPassword(this.utente.email, this.utente.password);
    this.router.navigate(['/home']);

  }



}
