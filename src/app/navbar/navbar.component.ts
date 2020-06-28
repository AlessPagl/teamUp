import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
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
  public adminLogged = false;

  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore, public router: Router, private valueservice: ValueService) {
    this.isLoggedAdmin();
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
  }

  async logoutUser() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  logoutAdmin() {
    this.firestore.collection("Admin").ref.where("logged", "==", true).get().then((admins) => {
      admins.forEach((admin) => {
        this.firestore.collection("Admin").doc(admin.id).update({
          logged: false
        })
      })
    })
    this.router.navigate(['/Pro342']);
  }

  isLoggedAdmin() {

    this.firestore.collection("Admin").get().forEach((admins) => {
      admins.forEach((admin) => {
        if(admin.data().logged === true)
        this.adminLogged = true;
        
      })
    })
    console.log(this.adminLogged);
  }

}
