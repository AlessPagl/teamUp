import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { ValueService } from '../value.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { newArray } from '@angular/compiler/src/util';


class progetto {

  public nome;
  public genere;
  public num_partecipanti;
  public descrizione;
  public nomeTeamLeader;
  public cognomeTeamLeader;
  public partecipa;

  constructor(@Inject(String) nome, @Inject(String) genere, @Inject(String) num_partecipanti, @Inject(String) descrizione, @Inject(String) nomeTeamLeader, @Inject(String) cognomeTeamLeader, @Inject(Boolean) partecipa ) {
    this.nome = nome;
    this.genere = genere;
    this.num_partecipanti = num_partecipanti;
    this.descrizione = descrizione;
    this.nomeTeamLeader = nomeTeamLeader;
    this.cognomeTeamLeader = cognomeTeamLeader;
    this.partecipa = partecipa;
    console.log(partecipa, this.partecipa)
  }

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public id;
  isAdmin: boolean;
  accesso: boolean;
  prelievo: boolean;
  idTeamLeader: string;
  public progetti: progetto[];
  nomeTL: string;
  cognomeTL: string;
  partecipa: boolean;

  constructor(public afAuth: AngularFireAuth, public router: Router, public firestore: AngularFirestore, private valueservice: ValueService) {

    this.AcquisizioneProgetti();

    this.valueservice.cast.subscribe(data => this.isAdmin = data);

    this.afAuth.authState.subscribe((user) => {

      if ((user === null) && (this.isAdmin === false)) {
        this.router.navigate(['/login']);
      }

    });

  }

  ngOnInit(): void {

  }

  AcquisizioneProgetti() {

    this.afAuth.authState.subscribe((users) => {
      this.idTeamLeader = users.uid;
      this.firestore.collection("Progetto").get().forEach((projs) => {
        projs.forEach((proj) => {
          this.firestore.collection("teamMate").doc(proj.data().teamLeader).get().forEach((user) => {
            this.nomeTL = user.data().nome;
            this.cognomeTL = user.data().cognome;
              if (proj.data().teamLeader === this.idTeamLeader) {
                this.partecipa = false
              }
              else
              {
                this.partecipa = true
              }
  
            if (this.progetti != undefined) {
              this.progetti.push(new progetto(proj.data().nome, proj.data().genere, proj.data().num_partecipanti, proj.data().descrizione, this.nomeTL, this.cognomeTL, this.partecipa));
            }
            else {
              this.progetti = [new progetto(proj.data().nome, proj.data().genere, proj.data().num_partecipanti, proj.data().descrizione, this.nomeTL, this.cognomeTL, this.partecipa)];
            } 
          }
          )
        });
      });
  
    })
  }
}
