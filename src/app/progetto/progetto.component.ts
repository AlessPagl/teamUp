import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progetto',
  templateUrl: './progetto.component.html',
  styleUrls: ['./progetto.component.scss']
})
export class ProgettoComponent implements OnInit {

  public progetto = { nome: "", descrizione: "", genere: "", num_partecipanti: "", utente: "" };
  aggProgetto = false;

  valoreProgetto: boolean;

  @Input() aggiungiProgetto: Function;

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {
    console.log(this.aggiungiProgetto)

  }

  ngOnInit(): void {}


  addProgetto() {

    this.afAuth.authState.subscribe(user => {
      this.progetto.utente = user.uid;
      this.firestore.collection("Progetto").add({

        ...this.progetto
  
      })

      .then(() => {window.location.reload();})

    })


  }

}
