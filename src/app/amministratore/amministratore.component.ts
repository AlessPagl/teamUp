import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amministratore',
  templateUrl: './amministratore.component.html',
  styleUrls: ['./amministratore.component.scss']
})
export class AmministratoreComponent implements OnInit {

  public amministratore = { username: "", password: "" };
  public username;
  public password;
  public accesso = false;

  constructor(public firestore: AngularFirestore, public router: Router) { }

  ngOnInit(): void {
  }

  Auth() {

    this.firestore.collection("Admin").get().forEach((admins) => {
      admins.forEach((admin) => {
        this.amministratore.username = admin.data().username;
        this.amministratore.password = admin.data().password;
        if ((this.amministratore.username === this.username) && (this.amministratore.password === this.password)) {
          this.router.navigate(['/home']);
        }
      })
    });

  }
}
