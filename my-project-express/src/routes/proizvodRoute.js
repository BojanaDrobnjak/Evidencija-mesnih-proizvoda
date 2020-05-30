var Proizvodi = require("../controller/proizvod.controller");

module.exports = function(router) {
  router.post("/create", Proizvodi.createProizvod);
  router.get("/get", Proizvodi.getProizvodi);
  router.get("/get/:id", Proizvodi.getProizvod);
  router.put("/update/:id", Proizvodi.updateProizvod);
  router.delete("/remove/:id", Proizvodi.removeProizvod);
};
