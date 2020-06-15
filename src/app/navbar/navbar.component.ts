import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, public afAuth: AngularFireAuth, public router: Router) { this.navbar(); }

  ngOnInit(): void {
  }

  navbar(){
    console.log(this.afAuth.authState.subscribe((user)=>{console.log(user.uid)}));
  }

}
