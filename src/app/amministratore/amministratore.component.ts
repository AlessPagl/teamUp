import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ValueService } from '../value.service';

@Component({
  selector: 'app-amministratore',
  templateUrl: './amministratore.component.html',
  styleUrls: ['./amministratore.component.scss']
})
export class AmministratoreComponent implements OnInit {

  public amministratore = { username: "", password: "" };
  public username;
  public password;
  valore: boolean;

  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore, public router: Router, private valueservice: ValueService) {
    
    this.SignOutAdmin(); 
    this.afAuth.signOut();
    this.valore = false;

  }

  ngOnInit(): void {
    /* this.valueservice.cast.subscribe(data => this.valore = data); */
  }

  Auth() {

    this.valore = false;

    this.firestore.collection("Admin").get().forEach((admins) => {

      admins.forEach((admin) => {

        this.amministratore.username = admin.data().username;
        this.amministratore.password = admin.data().password;

        if ((this.amministratore.username === this.username) && (this.amministratore.password === this.password)) {

          this.firestore.collection("Admin").get().forEach((admins) =>{ 

            admins.forEach((admin) => {

              this.firestore.collection("Admin").doc(admin.id).update({

                logged: true

              })
            })})

            this.router.navigate(['/home']);
          
          /* this.cambioValore(); */
        }
        else {
          this.firestore.collection("Admin").get().forEach((admins) =>{ 

            admins.forEach((admin) => {

              this.firestore.collection("Admin").doc(admin.id).update({

                logged: false

              })
            })})
        }

      });

    })
  }

    SignOutAdmin() {

      this.firestore.collection("Admin").ref.where("logged", "==", true).get().then((admins) =>{

        admins.forEach((admin) => {

          this.firestore.collection("Admin").doc(admin.id).update({

            logged: false
            
          })
        })})

  }  
 


}
