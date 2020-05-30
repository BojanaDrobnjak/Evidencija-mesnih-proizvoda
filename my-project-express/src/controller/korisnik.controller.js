var Korisnici = require("../repository/korisnik.repository");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.createKorisnik = function(req, res, next) {
  var korisnik = {
    email: req.body.email,
    korisnickoIme: req.body.korisnickoIme,
    sifra: req.body.sifra
  };

  Korisnici.create(korisnik, function(err, korisnik) {
    console.log(korisnik, " korisnik");
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Korisnik je napravljen!"
    });
  });
};

exports.getKorisnici = function(req, res, next) {
  Korisnici.get({}, function(err, korisnici) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      korisnici
    });
  });
};

exports.getKorisnik = function(req, res, next) {
  Korisnici.get({ _id: req.params.id }, function(err, korisnici) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      korisnici
    });
  });
};

exports.updateKorisnik = function(req, res, next) {
  var korisnik = {
    email: req.body.email,
    korisnickoIme: req.body.korisnickoIme,
    sifra: req.body.sifra
  };

  Korisnici.update({ _id: req.params.id }, korisnik, function(err, korisnik) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Korisnik je uspesno izmenjen"
    });
  });
};

exports.removeKorisnik = function(req, res, next) {
  Korisnici.delete({ _id: req.params.id }, function(err, korisnik) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "korisnik uspesno izbrisan"
    });
  });
};

exports.login = function(req, res) {
  Korisnici.get({ korisnickoIme: req.body.korisnickoIme }, function(err, korisnik) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      if (!korisnik[0] || korisnik[0].sifra !== req.body.sifra) {
        return res.sendStatus(401);
      }

      var token = jwt.sign(
        { id: korisnik[0]._id, role: "user" },
        "todo-app-super-shared-secret",
        {
          expiresIn: "2h"
        }
      );
      res.send({ token });
    }
  });
};
