(function() {
	'use strict';

	// gets scene via ajax
	var Scene = function(url) {
		this.available_objects = {};
		this.commands = {};
		this.info = {};
		this.text = 'test';

		if (url) {
			this.fetch(url);
		}
	};

	Scene.prototype.fetch = function(url) {
		var request;
		request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = this.loadAjax.bind(this, request);
		request.onerror = this.ajaxError.bind(this);
		request.send();
	};

	Scene.prototype.loadAjax = function(request) {
		var data;
		if (request.status >= 200 && request.status < 400) {
			data = JSON.parse(request.responseText);

			this.info = data.info;
			this.commands = data.setup.commands;
			this.available_objects = data.setup.available_objects;
			this.text = data.setup.output;

		} else {
			// We reached our target server, but it returned an error
		}
	};

	Scene.prototype.ajaxError = function(e) {
		console.log(e);
	};

	module.exports = Scene;
}());
