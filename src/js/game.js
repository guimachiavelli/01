(function() {
	'use strict';

	var Game = function(scene, pubsub) {
		this.scene = scene;
		this.pubsub = pubsub;
	};

	Game.prototype.updateScene = function() {
		this.scene.fetch();
	};

	Game.prototype.updateText =  function(text) {
		this.textWindow.push(text);
	};

	module.exports = Game;
}());
