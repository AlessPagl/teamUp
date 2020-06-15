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

  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore, public router: Router) { }

  public utente = { nome: "", cognome: "", num_telefono: "", citta: "", email: "", password: "", confPassword: "" };

  ngOnInit(): void {
  }

  async registrazione() {

    if (this.utente.password === this.utente.confPassword) {

      var result = await this.afAuth.createUserWithEmailAndPassword(this.utente.email, this.utente.password);
      this.firestore.collection("Utente").add({
        nome: this.utente.nome,
        cognome: this.utente.cognome,
        numero_telefono: this.utente.num_telefono,
        città: this.utente.citta
      })

      this.router.navigate(['/pagina-profilo']);

    }
  }

}
