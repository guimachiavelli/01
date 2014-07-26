(function() {
	'use strict';

	var Player = function() {
		this.inventory = [];
		this.visitedScenes = [];
		this.itemDumpster = [];
		this.revealedItems = {};
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


	module.exports = Player;

}());
