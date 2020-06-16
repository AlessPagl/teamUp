import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public id;

  constructor(public afAuth: AngularFireAuth, public router: Router) {

    this.afAuth.authState.subscribe((user) => {
      if (user === null)
        this.router.navigate(['/login']);
    });

  }

  ngOnInit(): void {
  }

}
