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

  public riepilogo ={AndamentoProgetto:"", data:"" };
  public isDisabled = true;
  public tastoModifica = "Modifica";


  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit(): void {  }

  async modificaValori() {

    await this.afAuth.authState.subscribe((user) => {

      this.firestore.collection("riepilogo").doc(user.uid).set({
        ...this.riepilogo
      });

    });

  }
  modificaRiepilogo() {
    console.log("QUI")
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
