export class Proizvod {

    constructor(id, naziv, kolicina, idDobavljaca) {
        this._id = id;
        this.naziv = naziv;
        this.kolicina = kolicina;
        this.idDobavljaca = idDobavljaca;
    }
    _id: string;
    naziv: string;
    kolicina: number;
    idDobavljaca: string;
    nazivDobavljaca: string;
}
