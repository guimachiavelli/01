(function() {
	'use strict';

	var Loader = require('./loader');

	var Game;

	Game = function(pubsub) {
		this.pubsub = pubsub;
		this.loader = new Loader('./game/', pubsub);

		this.pubsub.subscribe('scene:loaded', this.updateScene.bind(this));
		this.pubsub.subscribe('beacon:click', this.onBeaconClick.bind(this));
	};

	Game.prototype.updateScene = function(e, scene) {
		this.scene = scene;
		this.pubsub.publish('game:update:title', this.scene.info.title);
		this.updateText(scene.description);
	};

	Game.prototype.updateText = function(text) {
		this.pubsub.publish('game:update:text', text);
	};

	Game.prototype.updateActions = function(actions) {
		this.pubsub.publish('game:update:actions', actions);
	};

	Game.prototype.loadIntro = function() {
		this.loader.fetch('intro');
	};

	Game.prototype.onBeaconClick = function(e, beacon) {
		var beaconContent;

		beaconContent = this.scene.beacons[beacon];

		if (beaconContent.actions) {
			console.log('open command menu');
			this.updateActions(beaconContent.actions);
			return;
		}


	};

	module.exports = Game;

}());
