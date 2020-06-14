import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {

  constructor() { 
    console.log("ciao sono qui");
  }

  ngOnInit(): void {
  }

}
