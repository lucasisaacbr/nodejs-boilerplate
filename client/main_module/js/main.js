(function () {
	"use strict";

	const Vue = require("vue");
	const app = require("./components/app.vue");

	new Vue({
		"el": "#app",
		"render": function (h) {
			return h(app)
    }
	})

}());