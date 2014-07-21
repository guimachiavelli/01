(function() {
	'use strict';

	var Scene = require('./scene'),
		Library = require('./library'),
		Player = require('./player');

	var Game = function(pubsub) {
		this.pubsub = pubsub;
		this.scene = new Scene('./game/intro.json', pubsub);
		this.player = new Player();
		this.library = new Library('./game/items.json', pubsub);
		this.text = [];
		this.items = [];
		this.commands = [];
		this.itemCommands = [];
		this.currentScene = 'intro';
		this.activeItem = null;

		this.pubsub.subscribe('scene:loaded', this.updateScene.bind(this));
		this.pubsub.subscribe('game:scene:command', this.executeCommand.bind(this));
		this.pubsub.subscribe('game:item:command', this.executeItemCommand.bind(this));
		this.pubsub.subscribe('item:clicked', this.onItemClick.bind(this));
	};

	Game.prototype.updateScene = function() {
		this.text.push(this.getSceneDescription());

		this.currentScene = this.scene.info.title;
		this.player.addScene(this.currentScene);

		this.updateItems();
		this.updateCommands();
		this.pubsub.publish('game:update');
	};

	Game.prototype.updateText = function() {
		this.text.push(this.scene.currentText);
		this.scene.currentText = '';
	};

	Game.prototype.getSceneDescription = function() {
		if (!this.player.hasVisited(this.scene.info.title)) {
			return this.scene.description.initial;
		}
		return this.scene.description.default;
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
			this.scene.changeScene('./game/' + exec.leadsTo + '.json');

			this.activeItem = null;
			this.itemCommands = [];
		}
	};

	Game.prototype.executeItemCommand = function(e, command) {
		var exec = this.getItemCommand(command);

		if (exec === false) {
			throw new Error('item: ' + command.item + ' does not have that action: ' + command.name);
		}

		this.scene.currentText = exec.output;

		if (exec.exit === true || exec.destroy === true) {
			this.activeItem = null;
			this.itemCommands = [];
		}

		if (exec.destroy === true) {
			var itemPosition = this.items.indexOf(command.item);
			this.items.splice(itemPosition, 1);
		}

		if (exec.reveal) {
			this.items.push(exec.reveal);
		}

		this.update();
	};

	Game.prototype.getCommand = function(command) {
		if (!this.scene.commands[command]) {
			throw new Error('command does not exist:' + command);
		}
		return this.scene.commands[command];
	};

	Game.prototype.onItemClick = function(e, item) {
		var itemCommands = this.getItemCommands(item);

		if (itemCommands === false) {
			throw new Error('item does not exist: ' + item);
		}

		this.itemCommands = this.makeItemCommandList(itemCommands);
		this.activeItem = item;
		this.update();
	};

	Game.prototype.getItemCommands = function(item) {
		if (this.scene.items[item]) {
			return this.scene.items[item].actions;
		}

		if (this.library.items[item]) {
			return this.library.items[item].actions;
		}

		return false;
	};

	Game.prototype.getItemCommand = function(command) {
		if (this.scene.items[command.item] && this.scene.items[command.item].actions[command.name]) {
			return this.scene.items[command.item].actions[command.name];
		}

		if (this.library.items[command.item] && this.library.items[command.item].actions[command.name]) {
			return this.library.items[command.item].actions[command.name];
		}

		return false;
	};




	Game.prototype.makeItemCommandList = function(commandsObject) {
		var command, commandArray = [];
		for (command in commandsObject) {
			if (commandsObject.hasOwnProperty(command)) {
				commandArray.push(command);
			}
		}

		return commandArray;
	};




	module.exports = Game;

}());
