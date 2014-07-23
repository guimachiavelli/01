(function() {
	'use strict';


	var Scene = require('./scene');

	var Library = function(url, pubsub) {
		this.url = url;
		this.pubsub = pubsub;
		this.fetch();
		this.items = {};
		this.scene = new Scene('./game/intro.json', pubsub);

		this.pubsub.subscribe('scene:loaded', this.update.bind(this));
	};

	Library.prototype.update = function() {
		this.pubsub.publish('library:update');
	};

	Library.prototype.fetch = function() {
		if (!this.url) {
			throw new Error('no url to request');
		}

		var request;
		request = new XMLHttpRequest();
		request.open('GET', this.url, true);
		request.onload = this.loadAjax.bind(this, request);
		request.send();
	};

	Library.prototype.loadAjax = function(request) {
		if (request.status < 200 && request.status > 400) return;

		var data = JSON.parse(request.responseText);

		this.items = data.items;
	};


	module.exports = Library;

}())
