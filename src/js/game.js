(function() {
	'use strict';

	var Game = function(scene) {
		this.scene = scene;
	};

	Game.prototype.updateScene = function() {
		this.scene.fetch();
	};

	Game.prototype.updateText =  function(text) {
		this.textWindow.push(text);
	};

	module.exports = Game;
}());
