import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-pagina-profilo',
  templateUrl: './pagina-profilo.component.html',
  styleUrls: ['./pagina-profilo.component.scss']
})
export class PaginaProfiloComponent implements OnInit {

  public utente = { citta: "", cognome: "", nome: "", num_telefono: "" };

  constructor(public firestore: AngularFirestore, private authService: AuthService, public afAuth: AngularFireAuth) {
    this.ngOnInit().then(() => { console.log(this.utente) });
  }

  async ngOnInit() {

    await this.afAuth.authState.subscribe((user) => {
      this.firestore.collection("Utente").doc(user.uid).get().forEach((user) => {
        this.utente.nome = user.data().nome;
         this.utente.cognome = user.data().cognome;
          this.utente.citta = user.data().città;
           this.utente.num_telefono = user.data().numero_telefono;
      });
    });



  }


}
