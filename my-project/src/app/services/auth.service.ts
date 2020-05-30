import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>("http://localhost:8080/korisnik/auth", {
        korisnickoIme: username,
        sifra: password
      })
      .pipe(
        map(result => {
          localStorage.setItem("access_token", result.token);
          return true;
        })
      );
  }

  odjava() {
    localStorage.removeItem("access_token");
    location.reload();
  }

  public get loggedIn(): boolean {
    return localStorage.getItem("access_token") !== null;
  }
}
