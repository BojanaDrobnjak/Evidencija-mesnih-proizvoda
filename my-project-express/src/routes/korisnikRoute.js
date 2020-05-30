var Korisnici = require("../controller/korisnik.controller");

module.exports = function(router) {
  router.post("/create", Korisnici.createKorisnik);
  router.get("/get", Korisnici.getKorisnici);
  router.get("/get/:id", Korisnici.getKorisnik);
  router.put("/update/:id", Korisnici.updateKorisnik);
  router.delete("/remove/:id", Korisnici.removeKorisnik);
  router.post("/auth", Korisnici.login);
};
