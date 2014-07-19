(function() {
	'use strict';
	var Scene = require('./scene');

	var Game = function(pubsub) {
		this.scene = new Scene('../src/game/intro.json', pubsub);
		this.pubsub = pubsub;
		this.text = [];
		this.items = [];
		this.commands = [];
		this.itemCommands = [];

		this.pubsub.subscribe('scene:loaded', this.update.bind(this));
		this.pubsub.subscribe('game:scene:command', this.executeCommand.bind(this));
		this.pubsub.subscribe('item:clicked', this.onItemClick.bind(this));

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


	Game.prototype.update = function() {
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

	Game.prototype.onItemClick = function(e, item) {
		var itemCommands = this.scene.items[item].actions;
		this.itemCommands = this.getItemCommandList(itemCommands);
		this.update();
	};

	Game.prototype.getItemCommandList = function(commandsObject) {
		var command, commandArray = [];
		for (command in commandsObject) {
			if (commandsObject.hasOwnProperty(command)) {
				commandArray.push(command);
			}
		}

		commandArray.push('exit');

		return commandArray;

	};



	module.exports = Game;
}());
