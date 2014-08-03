(function() {
	'use strict';

	var Library = require('./library'),
		Player = require('./player'),
		Commands = require('./commands'),
		Items = require('./items');

	Items = new Items();
	Commands = new Commands();

	var Game = function(pubsub) {
		this.pubsub = pubsub;
		this.player = new Player(pubsub);
		this.library = new Library('./game/items.json', pubsub);
		this.text = [];
		this.items = [];
		this.commands = [];
		this.itemCommands = [];
		this.currentScene = 'intro';
		this.activeItem = {name: null, type: null};
		this.inventory = [];

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
			return this.library.scene.setup.output.initial;
		}
		return this.library.scene.setup.output.default;
	};

	Game.prototype.updateInventory =  function() {
		this.inventory = this.player.itemList.inventory;
	};

	Game.prototype.updateItems =  function() {
		this.items = Items.getItems(this.library.scene.setup.items,
									this.player.itemList.destroyed,
									this.player.itemList.revealed[this.currentScene]);
	};

	Game.prototype.updateCommands =  function() {
		this.commands = Commands.getCommands(this.library.scene.setup.commandList,
											 this.player.revealedCommands[this.currentScene],
											 this.player.deletedCommands[this.currentScene]);
	};

	Game.prototype.update = function() {
		this.updateText(this.library.scene.currentText);
		this.updateItems();
		this.updateInventory();
		this.updateCommands();
		this.pubsub.publish('game:update');
	};

	Game.prototype.executeCommand = function(e, command) {
		var exec = this.getCommand(command);

		if (exec.reveal) {
			this.player.addSceneCommand(this.currentScene, exec.reveal);
		}

		if (exec.changeScene === true) {
			this.library.changeScene(exec.leadsTo);

			this.activeItem = {name: null, context: null};
			this.itemCommands = [];
		}

		if (exec.destroy === true) {
			this.player.deleteSceneCommand([this.currentScene], command);
		}

		if (exec.output) {
			this.library.scene.currentText = exec.output;
			this.update();
		}

	};

	Game.prototype.getCommand = function(command) {
		if (!this.library.scene.commands[command]) {
			throw new Error('command does not exist:' + command);
		}
		return this.library.scene.commands[command];
	};

	Game.prototype.onItemClick = function(e, item) {
		var itemCommands = Items.getItemCommands(
			item.name,
			this.library.scene.items,
			this.library.items);

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
			throw new Error(
				'item: ' + command.item + ' does not have that action: ' + command.name
			);
		}

		this.library.scene.currentText = exec.output;

		if (exec.open) {
			this.player.addSceneCommand(this.currentScene, exec.open);
		}

		if (exec.take) {
			this.player.addInventoryItem(exec.take);
		}

		if (exec.exit === true || exec.destroy === true) {
			this.activeItem = {name: null, context: null};
			this.itemCommands = [];
		}

		if (exec.destroy === true) {
			this.destroyItem(command);
		}

		if (exec.reveal) {
			this.player.addRevealedItem(this.currentScene, exec.reveal, command.context);
		}

		this.update();
	};

	Game.prototype.destroyItem = function(command) {
		var itemPosition = this.items.indexOf(command.item);
		if (command.context === 'scene') {
			this.items.splice(itemPosition, 1);
		} else if (command.context === 'inventory') {
			this.player.itemList.inventory.splice(itemPosition, 1);
		}
		this.player.itemList.destroyed.push(command.item);
	};

	Game.prototype.deleteCommand = function(command) {
		this.player.deleteCommands[this.currentScene].push(command);
	};

	module.exports = Game;

}());
