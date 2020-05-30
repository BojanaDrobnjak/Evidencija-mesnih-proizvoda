import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { daLiSeSifrePodudaraju } from "../../validators/password-validator.directive";
import { Router } from "@angular/router";
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Korisnik } from 'src/app/model/korisnik';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  sakrijSifru = true;
  sakrijPonovljenuSifru = true;
  istaSifra = true;

  get email() {
    return this.registrationForm.get("email");
  }
  get korisnickoIme() {
    return this.registrationForm.get("korisnickoIme");
  }
  get sifra() {
    return this.registrationForm.get("sifra");
  }
  get ponoviSifru() {
    return this.registrationForm.get("ponoviSifru");
  }

  constructor(private korisnikServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.napraviFormu();
  }

  napraviFormu() {
    this.registrationForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      korisnickoIme: new FormControl("", [Validators.required]),
      sifra: new FormControl("", [Validators.required]),
      ponoviSifru: new FormControl("", [])
    });
    this.izmeniValidatoreForme();
  }

  izmeniValidatoreForme() {
    this.registrationForm.controls["ponoviSifru"].setValidators([
      Validators.required,
      daLiSeSifrePodudaraju("sifra")
    ]);
  }

  submitForm() {

    if (
      this.email.invalid ||
      this.korisnickoIme.invalid ||
      this.sifra.invalid || 
      this.ponoviSifru.invalid
    ) {
      
      return;
    } else if (this.sifra.value !== this.ponoviSifru.value) {
      return (this.istaSifra = false);
    }

    this.registrujSe(
      new Korisnik(
        this.email.value,
        this.korisnickoIme.value,
        this.sifra.value
      )
    );
  }

  registrujSe(korisnik: Korisnik) {
    this.korisnikServis.registrujSe(korisnik).subscribe(
      data => {
        alert(
          "Uspesno ste se registrovali!"
        );
        this.router.navigate(["login"]);
      },
      error => {
        console.log("Registracija neuspesna: ", error);
      }
    );
  }
}
