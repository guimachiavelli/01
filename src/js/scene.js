(function() {
	'use strict';

	// gets scene via ajax
	var Scene = function(url, ajaxCallback) {
		this.available_objects = {};
		this.commands = {};
		this.info = {};
		this.text = 'test';
		this.url = url;

		if (url) {
			this.fetch(url);
		}

		window.addEventListener('app:command', this.executeCommand.bind(this))
	};

	Scene.prototype.fetch = function() {
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
		this.commands = data.setup.commands;
		this.available_objects = data.setup.available_objects;
		this.text = data.setup.output;
		this.exec_commands = data.commands;


		window.dispatchEvent(new Event('scene:loaded'));
	};

	Scene.prototype.ajaxError = function(e) {
		console.log(e);
	};

	Scene.prototype.changeScene = function(url) {
		this.fetch(url);
	};

	Scene.prototype.executeCommand = function(e) {
		var command = e.detail;
		var exec = this.getCommand(command);
		console.log(exec);

		if (exec.changeScene === true) {
			this.changeScene('../src/game/' + exec.leadsTo + '.json');
		}
	};

	Scene.prototype.getCommand = function(command) {
		if (!this.exec_commands[command]) {
			throw new Error('command does not exist');
		}
		return this.exec_commands[command];
	}

	module.exports = Scene;
}());
