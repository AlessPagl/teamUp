import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore, public router: Router) {
    this.afAuth.signOut().then(() => {
      this.afAuth.authState.subscribe((user) => {
        if (user != null)
          this.router.navigate(['/home']);
      })
    });
  }

  public utente = { nome: "", cognome: "", numero_telefono: "", citta: "", email: "", password: "", confPassword: "", descrizione: ""};

  ngOnInit(): void {
  }

  async registrazione() {

    if (this.utente.password === this.utente.confPassword) {

      var result = await this.afAuth.createUserWithEmailAndPassword(this.utente.email, this.utente.password);
      this.firestore.collection("Utente").doc(result.user.uid).set({
        nome: this.utente.nome,
        cognome: this.utente.cognome,
        numero_telefono: this.utente.numero_telefono,
        citta: this.utente.citta,
        descrizione: this.utente.descrizione
      })

      var result = await this.afAuth.signInWithEmailAndPassword(this.utente.email, this.utente.password);
      this.router.navigate(['/home']);

    }
  }

}
