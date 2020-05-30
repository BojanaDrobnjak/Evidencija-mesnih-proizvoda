import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../model/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  expressbaseUrl = "http://localhost:8080/korisnik";

  registrujSe(korisnik: Korisnik) {
    return this.http.post(this.expressbaseUrl + "/create", korisnik);
  }

  login(korisnickoIme: string, sifra: string) {
    return this.http.post(this.expressbaseUrl + "/login", {
      uss: korisnickoIme,
      pass: sifra
    });
  }

}
