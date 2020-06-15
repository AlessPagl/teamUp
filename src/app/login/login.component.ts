import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  /* public firestore; */

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

  constructor(public firestore: AngularFirestore) {

    /* this.firestore = firestore; */


  }

  scrivi() {
    console.log(this.firestore.collection("cities")
      .get()
      .forEach((citta) => {
        citta
          .forEach(cittaLetta => {
            console
              .log(cittaLetta.data())
          })
      }))

    /* .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  }); */

  }


}
