(function() {
	'use strict';

	var Loader;

	Loader = function(baseUrl, pubsub) {
		this.baseUrl = baseUrl;
		this.pubsub = pubsub;
	};

	Loader.prototype.load = function(request) {
		if (request.status < 200 && request.status > 400) return;

		this.pubsub.publish('scene:loaded', JSON.parse(request.responseText));
	};

	Loader.prototype.fetch = function(file) {
		if (!file) {
			throw new Error('no url to request');
		}

		var request;
		request = new XMLHttpRequest();
		request.open('GET', this.baseUrl + file + '.json', true);
		request.onload = this.load.bind(this, request);
		request.send();
	};


	module.exports = Loader;

}());

