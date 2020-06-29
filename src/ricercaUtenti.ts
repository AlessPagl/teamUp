import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Inject } from '@angular/core';

class utente {

    public nome;
    public cognome;
    public descrizione;
    public citta;
    public numero_telefono;
    
    constructor(@Inject(String) nome, @Inject(String) cognome, @Inject(String) descrizione, @Inject(String) citta, @Inject(String) numero_telefono) {
        
        this.nome = nome;
        this.cognome = cognome;
        this.descrizione = descrizione;
        this.citta = citta;
        this.numero_telefono = numero_telefono;
   
    }

    
}

class RicercaUtenti{

    private static _instance: RicercaUtenti;
    private utenti: utente[];
    private firestore: AngularFirestore;
    private idLoggato: string;
    public afAuth: AngularFireAuth;
    partecipa: boolean;
    constructor() { }
    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
    setfirestore(firestore, afAuth) {
        this.firestore = firestore
        this.afAuth = afAuth
    }

    async ricercaTeamMate(nomeCognome){
        this.utenti = [];

        var nomeTM: String
        var cognomeTM: String

        var nomeUtente
        var cognomeUtente

        var arrayNome: String[];

        this.afAuth.authState.subscribe((users)=>{

            if (users != null) {
                this.idLoggato = users.uid;
            }

            this.firestore.collection("teamMate").get().forEach((users)=> {
                
                users.forEach((user)=> {
                    nomeTM = user.data().nome;
                    nomeTM = nomeTM.toUpperCase();
                    cognomeTM = user.data().cognome;
                    cognomeTM = cognomeTM.toUpperCase();
                    
                    arrayNome = nomeCognome.split(" ");

                    nomeUtente = arrayNome[0].toUpperCase();
                    cognomeUtente = arrayNome[1].toUpperCase();
                    
                    if((nomeTM.search(nomeUtente)> -1) && (cognomeTM.search(cognomeUtente)>-1)||(nomeTM.search(cognomeUtente)> -1) && (cognomeTM.search(nomeUtente)>-1)) {
                        
                        if (this.utenti != undefined){
                            this.utenti.push(new utente(user.data().nome, user.data().cognome, user.data().descrizione, user.data().citta, user.data().numero_telefono));
                        }
                        else {
                            this.utenti = [new utente(user.data().nome, user.data().cognome, user.data().descrizione, user.data().citta, user.data().numero_telefono)];
                        }

                    }

                })

            })

        })

    }

}

export default RicercaUtenti