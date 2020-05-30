var Dobavljaci = require("../controller/dobavljac.controller");

module.exports = function (router) {
    router.post("/create", Dobavljaci.createDobavljac);
    router.get("/get", Dobavljaci.getDobavljaci);
    router.get("/get/:id", Dobavljaci.getDobavljac);
    router.put("/update/:id", Dobavljaci.updateDobavljac);
    router.delete("/remove/:id", Dobavljaci.removeDobavljac);
};
