(function() {
	'use strict';

	var Library = require('./library'),
		Player = require('./player'),
		Items = require('./items');

	Items = new Items();

	var Game = function(pubsub) {
		this.pubsub = pubsub;
		this.player = new Player();
		this.library = new Library('./game/items.json', pubsub);
		this.text = [];
		this.items = [];
		this.commands = [];
		this.itemCommands = [];
		this.currentScene = 'intro';
		this.activeItem = null;

		this.pubsub.subscribe('library:update', this.updateScene.bind(this));
		this.pubsub.subscribe('game:scene:command', this.executeCommand.bind(this));
		this.pubsub.subscribe('game:item:command', this.executeItemCommand.bind(this));
		this.pubsub.subscribe('item:clicked', this.onItemClick.bind(this));
	};

	Game.prototype.updateScene = function() {
		this.text.push(this.getSceneDescription());

		this.currentScene = this.library.scene.info.title;
		this.player.addScene(this.currentScene);

		this.updateItems();
		this.updateCommands();
		this.pubsub.publish('game:update');
	};

	Game.prototype.updateText = function(text) {
		this.text.push(text);
		this.library.scene.currentText = '';
	};

	Game.prototype.getSceneDescription = function() {
		if (!this.player.hasVisited(this.library.scene.info.title)) {
			return this.library.scene.description.initial;
		}
		return this.library.scene.description.default;
	};

	Game.prototype.updateItems =  function() {
		this.items = Items.getItems(this.library.scene.availableItems, this.player.itemDumpster);
	};

	Game.prototype.updateCommands =  function() {
		this.commands = this.library.scene.commandList;
	};

	Game.prototype.update = function() {
		this.updateText(this.library.scene.currentText);
		this.updateItems();
		this.updateCommands();
		this.pubsub.publish('game:update');
	};

	Game.prototype.executeCommand = function(e, command) {
		var exec = this.getCommand(command);

		if (exec.output) {
			this.library.scene.currentText = exec.output;
			this.update();
		}

		if (exec.changeScene === true) {
			this.library.scene.changeScene('./game/' + exec.leadsTo + '.json');

			this.activeItem = null;
			this.itemCommands = [];
		}
	};


	Game.prototype.getCommand = function(command) {
		if (!this.library.scene.commands[command]) {
			throw new Error('command does not exist:' + command);
		}
		return this.library.scene.commands[command];
	};

	Game.prototype.onItemClick = function(e, item) {
		var itemCommands = Items.getItemCommands(item, this.library.scene.items, this.library.items);

		if (itemCommands === false) {
			throw new Error('item does not exist: ' + item);
		}

		this.itemCommands = Items.makeItemCommandList(itemCommands);
		this.activeItem = item;
		this.update();
	};

	Game.prototype.executeItemCommand = function(e, command) {
		var exec = Items.getItemCommand(command, this.library.scene.items, this.library.items);

		if (exec === false) {
			throw new Error('item: ' + command.item + ' does not have that action: ' + command.name);
		}

		this.library.scene.currentText = exec.output;

		if (exec.exit === true || exec.destroy === true) {
			this.activeItem = null;
			this.itemCommands = [];
		}

		if (exec.destroy === true) {
			var itemPosition = this.items.indexOf(command.item);
			this.items.splice(itemPosition, 1);
			this.player.itemDumpster.push(command.item);
		}

		if (exec.reveal) {
			this.items.push(exec.reveal);
		}

		this.update();
	};



	module.exports = Game;

}());
