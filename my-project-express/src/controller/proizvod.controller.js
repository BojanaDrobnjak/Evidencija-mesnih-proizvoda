var Proizvodi = require("../repository/proizvod.repository");

exports.createProizvod = function(req, res, next) {
  console.log(req.body);
  var proizvod = {
    naziv: req.body.naziv,
    kolicina: req.body.kolicina,
    idDobavljaca: req.body.idDobavljaca
  };

  Proizvodi.create(proizvod, function(err, proizvod) {
    console.log(proizvod, "proizvod");
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Proizvod created successfully"
    });
  });
};

exports.getProizvodi = function(req, res, next) {
  Proizvodi.get({}, function(err, proizvodi) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      proizvodi: proizvodi
    });
  });
};

exports.getProizvod = function(req, res, next) {
  Proizvodi.get({ _id: req.params.id }, function(err, proizvodi) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      proizvodi
    });
  });
};

exports.updateProizvod = function(req, res, next) {
  var proizvod = {
    naziv: req.body.naziv,
    kolicina: req.body.kolicina,
    idDobavljaca: req.body.idDobavljaca
  };
  Proizvodi.update({ _id: req.params.id }, proizvod, function(err, proizvod) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Proizvodi uspesno promenjeni"
    });
  });
};

exports.removeProizvod = function(req, res, next) {
  Proizvodi.delete({ _id: req.params.id }, function(err, proizvod) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Proizvod uspesno izbrisan"
    });
  });
};
