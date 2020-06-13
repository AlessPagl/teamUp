import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public tipo="password";

  showPwd() {
    
    if (this.tipo === "password") {
      this.tipo = "text";
    } else {
      this.tipo = "password";
    }
  }

}
