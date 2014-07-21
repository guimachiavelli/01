(function() {
	'use strict';

	var Items = function(url, pubsub) {
		this.url = url;
		this.pubsub = pubsub;
		this.fetch();
		this.items = {};
	};

	Items.prototype.fetch = function() {
		if (!this.url) {
			throw new Error('no url to request');
		}

		var request;
		request = new XMLHttpRequest();
		request.open('GET', this.url, true);
		request.onload = this.loadAjax.bind(this, request);
		request.send();
	};

	Items.prototype.loadAjax = function(request) {
		if (request.status < 200 && request.status > 400) return;

		var data = JSON.parse(request.responseText);

		this.items = data.items;

	};

	module.exports = Items;

}())
