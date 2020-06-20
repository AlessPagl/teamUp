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

  constructor(@Inject(String) nome, @Inject(String) genere, @Inject(String) num_partecipanti, @Inject(String) descrizione) {
    this.nome = nome;
    this.genere = genere;
    this.num_partecipanti = num_partecipanti;
    this.descrizione = descrizione;
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
  public progetti: progetto[];



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

    this.firestore.collection("Progetto").get().forEach((projs) => {
      projs.forEach((proj) => {
        if (this.progetti != undefined) {
          this.progetti.push(new progetto(proj.data().nome, proj.data().genere, proj.data().num_partecipanti, proj.data().descrizione));
        }
        else {
          this.progetti= [new progetto(proj.data().nome, proj.data().genere, proj.data().num_partecipanti, proj.data().descrizione)];
        }
      }
      )
    });

  }


}
