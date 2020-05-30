import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorHandlerService } from "../services/http-error-handler.service";
import { Proizvod } from '../model/proizvod';
import { DobavljacService } from '../services/dobavljac.service';
import { Dobavljac } from '../model/dobavljac';
import { ProizvodService } from '../services/proizvod.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['naziv', 'kolicina', 'nazivDobavljaca'];
  dataSource = new MatTableDataSource;
  dobavljaci: Dobavljac[];
  proizvodi: Proizvod[];
  proizvodForma: FormGroup;

  constructor(
    private route: Router,
    private dobavljacServis: DobavljacService,
    private proizvodServis: ProizvodService
  ) { }

  ngOnInit(): void {
    this.napraviFormuZaDobavljace();
    this.dajPodatkeZaTabelu();
  }

  get naziv() {
    return this.proizvodForma.get("naziv");
  }

  get kolicina() {
    return this.proizvodForma.get("kolicina");
  }

  get nazivDobavljaca() {
    return this.proizvodForma.get("nazivDobavljaca");
  }

  dajPodatkeZaTabelu() {
    this.dajSveDobavljace();
    this.dajSveProizvode();
  }

  dajSveDobavljace() {
    this.dobavljacServis.dajDobavljace().subscribe(
      data => {
        this.dobavljaci = data.dobavljaci;
      },
      greska => {
        console.log("Greska: ", greska);
      }
    );
  }

  dajSveProizvode() {
    this.proizvodServis.dajProizvode().subscribe(
      data => {
        this.proizvodi = data.proizvodi;
        this.zameniDobavljacIdZaNaziv();
      },
      greska => {
        console.log("Greska: ", greska);
      }
    );
  }
  zameniDobavljacIdZaNaziv() {
    for (let i = 0; i < this.proizvodi.length; i++) {
      this.proizvodi[i].nazivDobavljaca = this.nadjiNazivDobavljacaPoNazivu(this.proizvodi[i].idDobavljaca);
    }
    this.dataSource = new MatTableDataSource(this.proizvodi);
  }

  nadjiNazivDobavljacaPoNazivu(id: string) {
    for (let i = 0; i < this.dobavljaci.length; i++) {
      if (this.dobavljaci[i]._id === id) {
        return this.dobavljaci[i].naziv;
      }
    }
    return "";
  }

  napraviFormuZaDobavljace() {
    this.proizvodForma = new FormGroup({
      naziv: new FormControl("", [Validators.required]),
      kolicina: new FormControl("", [Validators.required]),
      nazivDobavljaca: new FormControl("", [Validators.required])
    });
  }

  unesiProizvod() {
    if (
      this.naziv.invalid ||
      this.kolicina.invalid ||
      this.nazivDobavljaca.invalid
    ) {
      return;
    }
    this.proizvodServis.unesiProizvod(this.naziv.value,
      this.kolicina.value, this.nazivDobavljaca.value).subscribe(
        data => {
          console.log("data: ", data);
          location.reload();
        },
        error => {
          console.log("error: ", error);
        }
      );
  }

  nadjiProizvodPoId(id) {
    for (let i = 0; i < this.proizvodi.length; i++) {
      if (this.proizvodi[i]._id === id) {
        return this.proizvodi[i];
      }
    }
  }

  smanjiKolicinu(id) {
    let proizvod = this.nadjiProizvodPoId(id);
    if (proizvod.kolicina < 2) {
      let poruka = "Nema vise zaliha za proizvod " + proizvod.naziv;
      alert(poruka);
      this.izbrisiProizvod(proizvod._id);
      location.reload();
      return;
    } else if (proizvod.kolicina <= 50) {
      let poruka = "Potrebno je dopuniti zalihe za proizvod " + proizvod.naziv;
      alert(poruka);
    }
    proizvod.kolicina--;
    this.proizvodServis.promeniProizvod(id, proizvod).subscribe(
      data => {
      },
      error => {
        console.log("error: ", error);
      }
    );
  }

  izbrisiProizvod(id) {
    this.proizvodServis.izbrisiProizvod(id).subscribe(
      data => {
        console.log("Proizvod uspesno izbrisan");

      },
      error => {
        console.log("greska: ", error);
      }
    )
  }

  applyFilter(event: Event) {
    const vrednostZaFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = vrednostZaFilter.trim().toLowerCase();
  }

}



