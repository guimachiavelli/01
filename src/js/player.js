(function() {
	'use strict';

	var Player = function(pubsub) {
		this.pubsub = pubsub;
		this.visitedScenes = [];
		this.revealedCommands = {};
		this.deletedCommands = {};
		this.itemList = {
			'destroyed' : [],
			'inventory' : [],
			'revealed' : []
		};
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

	Player.prototype.addRevealedItem = function(scene, item, context) {
		if (context === 'inventory') {
			this.addInventoryItem(item);
			return;
		}

		if (typeof this.itemList.revealed[scene] !== Array) {
			this.itemList.revealed[scene] = [];
		}
		this.itemList.revealed[scene].push(item);
	};

	Player.prototype.addInventoryItem = function(item) {
		this.itemList.inventory.push(item);
	};


	Player.prototype.addSceneCommand = function(scene, command) {
		if (typeof this.revealedCommands[scene] !== Array) {
			this.revealedCommands[scene] = [];
		}
		this.revealedCommands[scene] = this.revealedCommands[scene].concat(command);
	};

	Player.prototype.deleteSceneCommand = function(scene, command) {
		if (typeof this.deletedCommands[scene] !== Array) {
			this.deletedCommands[scene] = [];
		}
		this.deletedCommands[scene] = this.deletedCommands[scene].concat(command);
	};



	module.exports = Player;

}());
