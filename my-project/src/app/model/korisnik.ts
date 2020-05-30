export class Korisnik {

    constructor(email, korisnickoIme, sifra) {
        this.email = email;
        this.korisnickoIme = korisnickoIme;
        this.sifra = sifra;
    }

    id: string;
    email: string;
    korisnickoIme: string;
    sifra: string;
}
