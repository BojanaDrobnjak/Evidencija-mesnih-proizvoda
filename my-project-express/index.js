var express = require("express");
var cors = require("cors");
var properties = require("./config/properties");
var db = require("./config/connection");
var log = require("morgan")("dev");
var bodyParser = require("body-parser");

var proizvodRoutes = require("./src/routes/proizvodRoute");
var korisnikRoutes = require("./src/routes/korisnikRoute");
var dobavljacRoutes = require("./src/routes/dobavljacRoute");

const expressJwt = require("express-jwt");

var app = express();
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

var proizvodRouter = express.Router();
var korisnikRouter = express.Router();
var dobavljacRouter = express.Router();

app.use(cors());
db();
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

app.use(
  expressJwt({ secret: "todo-app-super-shared-secret" }).unless({
    path: ["/korisnik/auth", "/korisnik/create"]
  })
);

app.use("/proizvod", proizvodRouter);
proizvodRoutes(proizvodRouter);

app.use("/korisnik", korisnikRouter);
korisnikRoutes(korisnikRouter);

app.use("/dobavljac", dobavljacRouter);
dobavljacRoutes(dobavljacRouter);

app.listen(properties.PORT, (request, result) => {
  console.log(`port je: ${properties.PORT}`);
});
