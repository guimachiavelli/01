(function() {
	'use strict';

	// gets scene via ajax
	var Scene = function(url, pubsub) {
		this.availableObjects = {};
		this.commands = {};
		this.info = {};
		this.text = [];
		this.url = url;
		this.pubsub = pubsub;
		this.items = {};

		this.fetch();
	};

	Scene.prototype.fetch = function() {
		if (!this.url) {
			throw new Error('no url to request');
		}

		var request;
		request = new XMLHttpRequest();
		request.open('GET', this.url, true);
		request.onload = this.loadAjax.bind(this, request);
		request.onerror = this.ajaxError.bind(this);
		request.send();
	};


	Scene.prototype.loadAjax = function(request) {
		if (request.status < 200 && request.status > 400) return;
		var data;

		data = JSON.parse(request.responseText);

		this.info = data.info;
		this.commandList = data.setup.commands;
		this.availableObjects = data.setup.items;
		this.description = data.setup.output;
		this.commands = data.commands;
		this.items = data.items;

		this.pubsub.publish('scene:loaded');
	};

	Scene.prototype.ajaxError = function(e) {
		console.log(e);
	};

	Scene.prototype.changeScene = function(url) {
		this.url = url;
		this.fetch();
	};

	module.exports = Scene;

}());
