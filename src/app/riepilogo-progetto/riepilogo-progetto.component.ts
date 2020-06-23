import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


class progetto {

  public nome;
  public genere;
  public num_partecipanti;
  public descrizione;
  public teamLeader;
  public data_pubblicazione;
  public num_teamMate;
  public stato;
  public dataProgetto;
  public id_descrizione = "idDes";
  public id_riepilogo = "idRie";
  public id_candidature = "idCan";

  constructor(@Inject(String) nome, @Inject(String) genere, @Inject(String) num_partecipanti, @Inject(String) descrizione, @Inject(String) teamLeader, @Inject(Object) data_pubblicazione, @Inject(Boolean) num_teamMate, @Inject(Boolean) stato) {
    this.nome = nome;
    this.genere = genere;
    this.num_partecipanti = num_partecipanti;
    this.descrizione = descrizione;
    this.teamLeader = teamLeader;
    this.data_pubblicazione = new Date(data_pubblicazione.seconds*1000);
    this.num_teamMate = num_teamMate;
    this.stato = stato;
    this.dataProgetto = this.data_pubblicazione.getDate() + "/" + (this.data_pubblicazione.getMonth() + 1) + "/" + this.data_pubblicazione.getFullYear();
    this.id_descrizione += this.nome;
    this.id_riepilogo += this.nome;
    this.id_candidature += this.nome;
   
  }

 
}

@Component({
  selector: 'app-riepilogo-progetto',
  templateUrl: './riepilogo-progetto.component.html',
  styleUrls: ['./riepilogo-progetto.component.scss']
})
export class RiepilogoProgettoComponent implements OnInit {

  public riepilogo = { AvanzamentoProgetto: "", data: new Date() };

  public progetti: progetto[];

  public isDisabled = true;
  public tastoModifica = "Modifica";
  public dataRiepilogo = this.riepilogo.data.getDate() + "/" + (this.riepilogo.data.getMonth() + 1) + "/" + this.riepilogo.data.getFullYear();


  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {
    this.getProgetti()
  }

  ngOnInit(): void { }

  getProgetti() {
    this.afAuth.authState.subscribe(async (user) => {
      await this.firestore.collection("Progetto").ref.where("teamLeader", "==", user.uid).get().then((docs) => {
        docs.forEach(doc => {
          if (this.progetti === undefined) {
            this.progetti = [new progetto(doc.data().nome, doc.data().genere, doc.data().num_partecipanti, doc.data().descrizione, doc.data().teamLeader, doc.data().data_pubblicazione, doc.data().num_teamMate, doc.data().stato)]
          }
          else {
            this.progetti.push(new progetto(doc.data().nome, doc.data().genere, doc.data().num_partecipanti, doc.data().descrizione, doc.data().teamLeader, doc.data().data_pubblicazione, doc.data().num_teamMate, doc.data().stato))
          }
        })
      })
    })

  }

  async modificaValori() {

    //subscribe((user) => {

    //il problema è qui, se salvi le informazioni con l'ID dell'utente non sai a che profilo
    //si riferisce
    //2 alternative: 
    //Recuperi e salvi le cose con l'ID del progetto
    //Salvi il riepilogo in un sub collection del progetto

    // this.firestore.collection("riepilogo").doc(user.uid).set({
    //   ...this.riepilogo

    // });

  }


  modificaRiepilogo() {
    if (this.isDisabled === true) {
      this.isDisabled = false;
      this.tastoModifica = "Salva";
    }
    else {
      this.isDisabled = true;
      this.modificaValori(),
        this.tastoModifica = "Modifica";
    }
  }

}
