import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { ValueService } from '../value.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public id;
  isAdmin: boolean;
  accesso:boolean;

  constructor(public afAuth: AngularFireAuth, public router: Router, private valueservice: ValueService) {

    this.valueservice.cast.subscribe(data => this.isAdmin = data);
    
    this.afAuth.authState.subscribe((user) => {

      if((user === null) && (this.isAdmin === false))
      {
        this.router.navigate(['/login']);
      }
      
    });

  }

  ngOnInit(): void {
    
  }

}
