import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pagina-profilo',
  templateUrl: './pagina-profilo.component.html',
  styleUrls: ['./pagina-profilo.component.scss']
})
export class PaginaProfiloComponent implements OnInit {

  public utente = { citta: "", cognome: "", nome: "", numero_telefono: "", descrizione: "" };
  public email = "";
  public password = "";
  public credenziali = firebase.auth.EmailAuthProvider.credential(this.email, this.password);

  constructor(public firestore: AngularFirestore, private authService: AuthService, public afAuth: AngularFireAuth, public router: Router) {

    this.afAuth.authState.subscribe((user) => {
      if (user === null)
        this.router.navigate(['/login']);
    });

    this.acquisizioneProfilo().then(() => { console.log(this.utente) });

  }

  ngOnInit(){}

  async acquisizioneProfilo() {

    await this.afAuth.authState.subscribe((user) => {
      this.email = user.email;
      this.firestore.collection("Utente").doc(user.uid).get().forEach((user) => {
        this.utente.nome = user.data().nome;
        this.utente.cognome = user.data().cognome;
        this.utente.citta = user.data().citta;
        this.utente.numero_telefono = user.data().numero_telefono;
        this.utente.descrizione = user.data().descrizione;
      });
    });

  }

  async modificheValori() {

    await this.afAuth.authState.subscribe((user) => {

      this.firestore.collection("Utente").doc(user.uid).set({
        ...this.utente
      });

    });

  }

 async modificaEmail() {

    (await this.afAuth.currentUser).updateEmail(this.email);
    
    (await this.afAuth.currentUser).reauthenticateWithCredential(this.credenziali).then(function() {
      // User re-authenticated.
    }).catch(function(error) {
      // An error happened.
    });

  } 

  public isDisabled = true;
  testo = "Modifica";

  modificaProfilo() {
    if (this.isDisabled === true) {
      this.isDisabled = false;
      this.testo = "Salva";
    }
    else {
      this.isDisabled = true;
      this.modificheValori(),
      this.modificaEmail(),
      this.testo = "Modifica";
    }
  }

  async modificaPassword() {
    
    this.afAuth.sendPasswordResetEmail(this.email).then(function() {

    }).catch(function(error) {

    });

    (await this.afAuth.currentUser).reauthenticateWithCredential(this.credenziali).then(function() {
      // Utente autenticato
    }).catch(function(error) {
      // Errore
    });

  }


}
