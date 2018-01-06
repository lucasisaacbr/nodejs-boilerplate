(function () {
  "use strict";

  module.exports = function(app) {
    app.get("/", function(req, res){
      res.status(200).send("OK");
    });
  }

}());