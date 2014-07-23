(function() {
	'use strict';

	var Player = function() {
		this.inventory = [];
		this.visitedScenes = [];
		this.itemDumpster = [];
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

	module.exports = Player;

}());
