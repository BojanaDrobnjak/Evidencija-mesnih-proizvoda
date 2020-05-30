import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProizvodLista } from '../model/proizvod-lista';
import { Proizvod } from '../model/proizvod';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  constructor(private http: HttpClient) { }

  backendURL = "http://localhost:8080/proizvod/";

  dajProizvode() {
    return this.http.get<ProizvodLista>(this.backendURL + "get");
  }

  dajProizvodPoId(id: string) {
    return this.http.get<ProizvodLista>(this.backendURL + "get/" + id);
  }

  unesiProizvod(naziv: string, kolicina: number, idDobavljaca: string) {
    return this.http.post<Proizvod>(this.backendURL + "create", {
      'naziv': naziv,
      'kolicina': kolicina,
      'idDobavljaca': idDobavljaca
    });
  }

  izbrisiProizvod(id: String) {
    return this.http.delete(this.backendURL + "remove/" + id);
  }

  promeniProizvod(id: string, proizvod: Proizvod) {
    return this.http.put(this.backendURL + "update/" + id, proizvod);
  }

}
