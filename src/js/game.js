(function() {
	'use strict';
	var Scene = require('./scene');


	var Game = function(pubsub) {
		this.scene = new Scene('../src/game/intro.json', pubsub);
		this.pubsub = pubsub;
		this.text = [];
		this.items = [];
		this.commands = [];

		this.pubsub.subscribe('scene:loaded', this.update.bind(this))
		this.pubsub.subscribe('app:command', this.executeCommand.bind(this));

	};

	Game.prototype.updateScene = function() {
		this.scene.fetch();
	};

	Game.prototype.updateText =  function() {
		this.text.push(this.scene.currentText);
	};

	Game.prototype.updateItems =  function() {
		this.items = this.scene.availableObjects;
	};

	Game.prototype.updateCommands =  function() {
		this.commands = this.scene.commandList;
	};


	Game.prototype.update = function(e) {
		this.updateText();
		this.updateItems();
		this.updateCommands();
		this.pubsub.publish('game:update');
	};

	Game.prototype.executeCommand = function(e, command) {
		var exec = this.getCommand(command);

		if (exec.output) {
			this.scene.currentText = exec.output;
			this.update();
		}

		if (exec.changeScene === true) {
			this.scene.changeScene('../src/game/' + exec.leadsTo + '.json');
		}
	};

	Game.prototype.getCommand = function(command) {
		if (!this.scene.commands[command]) {
			throw new Error('command does not exist:' + command);
		}
		return this.scene.commands[command];
	};



	module.exports = Game;
}());
