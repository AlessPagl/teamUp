import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormControlDirective } from '@angular/forms';

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

  public profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  login() {
    console.log(this.profileForm.get('email'), this.profileForm.get('password'));
    console.log("cia");
    /* var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['admin/list']); */
  }

  constructor(private authService: AuthService) {


  }

}
