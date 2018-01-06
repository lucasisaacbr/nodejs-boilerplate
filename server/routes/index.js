(function () {
  "use strict";
  module.exports = function(app) {

    require("./helpers/routeHelper")(app);

    app.get("/", function(req, res){
      return res.status(200).render("./main_module/index.html");
    });
  }

}());