(function() {
	'use strict';

	var Player = function(pubsub) {
		this.pubsub = pubsub;
		this.inventory = [];
		this.visitedScenes = [];
		this.itemDumpster = [];
		this.revealedItems = {};
		this.revealedCommands = [];
	};

	Player.prototype.addScene = function(scene) {
		if (this.visitedScenes.indexOf(scene) !== -1) {
			return;
		}
		this.visitedScenes.push(scene);
	};

	Player.prototype.hasVisited = function(scene) {
		if (this.visitedScenes.indexOf(scene) === -1) {
			return false;
		}

		return true;
	};

	Player.prototype.addRevealedItem = function(scene, item) {
		if (typeof this.revealedItems[scene] !== Array) {
			this.revealedItems[scene] = [];
		}
		this.revealedItems[scene].push(item);
	};

	Player.prototype.addInventoryItem = function(item) {
		this.inventory.push(item);
	};


	Player.prototype.addSceneCommand = function(scene, command) {
		if (typeof this.revealedCommands[scene] !== Array) {
			this.revealedCommands[scene] = [];
		}
		this.revealedCommands[scene] = this.revealedCommands[scene].concat(command);
	};

	module.exports = Player;

}());
