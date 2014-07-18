(function() {
	'use strict';

	var Game = function(scene, pubsub) {
		this.scene = scene;
		this.pubsub = pubsub;
		this.text = [];

		this.pubsub.subscribe('scene:loaded', this.updateText.bind(this))
	};

	Game.prototype.updateScene = function() {
		this.scene.fetch();
	};

	Game.prototype.updateText =  function(e) {
		this.text.push(this.scene.text);
		this.pubsub.publish('text:update')
	};

	module.exports = Game;
}());
