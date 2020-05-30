import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DobavljacLista } from '../model/dobavljac-lista';
import { Dobavljac } from '../model/dobavljac';

@Injectable({
  providedIn: 'root'
})
export class DobavljacService {

  constructor(private http: HttpClient) { }

  backendURL = "http://localhost:8080/dobavljac/";

  dajDobavljace() {
    return this.http.get<DobavljacLista>(this.backendURL + "get");
  }

  dajDobavljacaoId(id: string) {
    return this.http.get<DobavljacLista>(this.backendURL + "get/" + id);
  }

  unesiDobavljaca(dobavljac: string) {
    return this.http.post<Dobavljac>(this.backendURL + "create", {'naziv': dobavljac});
  }

  izbrisiDobavljaca(id: String) {
    return this.http.delete(this.backendURL + "remove/" + id);
  }

  promeniDobavljaca(id: string, dobavljac: Dobavljac) {
    return this.http.put(this.backendURL + "update/" + id, dobavljac);
  }

}
