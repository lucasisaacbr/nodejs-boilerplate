(function () {
  "use strict";

  const appEnv = require("cfenv").getAppEnv();
  process.isLocal = /localhost/.test(appEnv.bind) || appEnv.isLocal;
  require("dotenv").config({
    "silent": true
  });

  const express = require("express");
  const app = express();
  const compress = require("compression");
  const engines = require("consolidate");
  const morgan = require("morgan");
  const bodyParser = require("body-parser");
  const cookieSession = require("cookie-session");
  const cookieParser = require("cookie-parser");
  const fs = require("fs");

  // HTTP helpers

  const axios = require("axios");
  const querystring = require('querystring');

  const multer = require("multer");
  const upload = multer({
    "fileFilter": function (req, file, cb) {
      if (file.mimetype === "text/csv") {
        return cb(null, true);
      } else {
        return cb(new Error("Invalid file mimetype"));
      }
    }
  });

  app.disable("x-powered-by");
  app.use(compress());

  app.engine("html", engines.ejs);
  app.set("view engine", "ejs");
  app.set("views", __dirname + "/client");
  app.use(express.static(__dirname + "/client"));
  app.use(bodyParser.json({
    "limit": "50mb"
  }));
  app.use(bodyParser.urlencoded({
    "extended": true,
    "limit": "10mb"
  }));
  app.use(cookieParser());
  app.use(cookieSession({
    "secret": process.env.APP_SECRET,
    "maxAge": 8640000
  }));

  require("./server/routes")(app);

  if (process.isLocal) {
    app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
  }

  app.listen(process.env.PORT || 3001, process.env.IP || '0.0.0.0', function () {
    console.log("server starting on %d, in %s mode", process.env.PORT || 3001, app.get('env'));
  });


}());