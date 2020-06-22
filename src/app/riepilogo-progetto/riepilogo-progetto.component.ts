import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-riepilogo-progetto',
  templateUrl: './riepilogo-progetto.component.html',
  styleUrls: ['./riepilogo-progetto.component.scss']
})
export class RiepilogoProgettoComponent implements OnInit {

  public riepilogo ={AvanzamentoProgetto:"", data: new Date() };
  public isDisabled = true;
  public tastoModifica = "Modifica";
  public dataRiepilogo = this.riepilogo.data.getDate() + "/" + (this.riepilogo.data.getMonth()+1) + "/" + this.riepilogo.data.getFullYear()


  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit(): void {  }

  async modificaValori() {
    await this.afAuth.authState.subscribe((user) => {
      
      //il problema è qui, se salvi le informazioni con l'ID dell'utente non sai a che profilo
      //si riferisce
      //2 alternative: 
      //Recuperi e salvi le cose con l'ID del progetto
      //Salvi il riepilogo in un sub collection del progetto

      this.firestore.collection("riepilogo").doc(user.uid).set({
        ...this.riepilogo
        
      });

    });

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
