(function() {
	'use strict';

	var Loader = require('./loader');

	var Game;

	Game = function(pubsub) {
		this.pubsub = pubsub;
		this.loader = new Loader('./game/', pubsub);

		this.pubsub.subscribe('scene:loaded', this.update.bind(this));
	};

	Game.prototype.update = function(e, scene) {
		this.pubsub.publish('game:update', scene.setup.output.initial);
	};

	Game.prototype.loadIntro = function() {
		this.loader.fetch('intro');
	};

	module.exports = Game;

}());
