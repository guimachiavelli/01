(function() {
	'use strict';

	var Library = function(url, pubsub) {
		this.pubsub = pubsub;

		this.items = null;
		this.scene = null;

		this.fetch('./game/items.json', 'items');
		this.fetch('./game/intro.json', 'scene');

		this.pubsub.subscribe('library:loaded', this.update.bind(this));
	};

	Library.prototype.update = function() {
		if (this.scene && this.items){
			this.pubsub.publish('library:update');
		}
	};

	Library.prototype.fetch = function(url, type) {
		if (!url) {
			throw new Error('no url to request');
		}

		var request;
		request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = this.load.bind(this, request, type);
		request.send();
	};

	Library.prototype.load = function(request, type) {
		if (request.status < 200 && request.status > 400) return;

		var data = JSON.parse(request.responseText);

		this[type] = data;

		this.pubsub.publish('library:loaded');
	};

	Library.prototype.changeScene = function(scene) {
		this.fetch('./game/' + scene + '.json', 'scene');
	};

	module.exports = Library;

}());
