import { Component, OnInit } from '@angular/core';
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

  constructor(public afAuth: AngularFireAuth, public router: Router) {  
    this.afAuth.signOut();
  }

  public teamMate = { email: "", password: "" };

  async login() {

    var result = await this.afAuth.signInWithEmailAndPassword(this.teamMate.email, this.teamMate.password);
    this.router.navigate(['/home']);

  }


}
