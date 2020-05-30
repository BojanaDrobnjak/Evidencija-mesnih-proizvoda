var Dobavljaci = require("../repository/dobavljac.repository");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.createDobavljac = function (req, res, next) {
    console.log("body: ", req.body);
    var dobavljac = {
        naziv: req.body.naziv
    };

    Dobavljaci.create(dobavljac, function (err, dobavljac) {
        if (err) {
            res.json({
                error: err
            });
        }
        res.json({
            message: "dobavljac je napravljen!"
        });
    });
};

exports.getDobavljaci = function (req, res, next) {
    Dobavljaci.get({}, function (err, dobavljaci) {
        if (err) {
            res.json({
                error: err
            });
        }
        res.json({
            dobavljaci
        });
    });
};

exports.getDobavljac = function (req, res, next) {
    Dobavljaci.get({ _id: req.params.id }, function (err, dobavljac) {
        if (err) {
            res.json({
                error: err
            });
        }
        res.json({
            dobavljac
        });
    });
};

exports.updateDobavljac = function (req, res, next) {
    var dobavljac = {
        naziv: req.body.naziv
    };

    Korisnici.update({ _id: req.params.id }, dobavljac, function (err, dobavljac) {
        if (err) {
            res.json({
                error: err
            });
        }
        res.json({
            message: "dobavljac je uspesno izmenjen"
        });
    });
};

exports.removeDobavljac = function (req, res, next) {
    Dobavljaci.delete({ _id: req.params.id }, function (err, dobavljac) {
        if (err) {
            res.json({
                error: err
            });
        }
        res.json({
            message: "dobavljac uspesno izbrisan"
        });
    });
};
