import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-riepilogo-progetto',
  templateUrl: './riepilogo-progetto.component.html',
  styleUrls: ['./riepilogo-progetto.component.scss']
})
export class RiepilogoProgettoComponent implements OnInit {

  public riepilogo ={titolo:"", descrizione:"", data:"" };
  public isDisabled = true;

  constructor() { }

  ngOnInit(): void {
  }

}
