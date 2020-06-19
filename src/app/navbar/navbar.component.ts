import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { ValueService } from '../value.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public logged = false;
  valore: boolean;

  constructor(public afAuth: AngularFireAuth, public router: Router, private valueservice: ValueService) {
    this.isLogged();
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

    this.valueservice.cast.subscribe(data => this.valore = data);
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }

}
