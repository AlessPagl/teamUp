import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-profilo',
  templateUrl: './pagina-profilo.component.html',
  styleUrls: ['./pagina-profilo.component.scss']
})
export class PaginaProfiloComponent implements OnInit {

  public utente = { citta: "", cognome: "", nome: "", numero_telefono: "", descrizione: "" };
  public email = "";
  public password = "";

  constructor(public firestore: AngularFirestore, private authService: AuthService, public afAuth: AngularFireAuth, public router: Router) {

    this.afAuth.authState.subscribe((user) => {
      if (user === null)
        this.router.navigate(['/login']);
    });

    this.ngOnInit().then(() => { console.log(this.utente) });

  }

  async ngOnInit() {

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

    (await this.afAuth.currentUser).updateEmail(this.email)

  }

  public isDisabled = true;
  testo = "Modifica";

  modificaProfilo() {
    if (this.isDisabled === true) {
      this.isDisabled = false;
      this.testo = "Salva";
    }
    else {
      console.log(this.utente);
      this.isDisabled = true;
      this.modificheValori(),
      this.modificaEmail(),
      this.testo = "Modifica";
    }
  }

  modificaPassword() {
    
    this.afAuth.sendPasswordResetEmail(this.email).then(function() {

    }).catch(function(error) {

    });

  }


}
