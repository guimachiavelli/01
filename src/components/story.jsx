(function() {
	'use strict';

	var React = require('react'),
		PubSub = require('../js/pubsub'),
		CommandTree = require('./commandTree.jsx'),
		TextWindow = require('./textWindow.jsx'),
		Game = require('../js/game');

	var pubsub, Story, game;

	pubsub = new PubSub();

	game = new Game(pubsub);

	game.loadIntro();

	Story = React.createClass({
		getInitialState: function() {
			return {
				title: '',
				text: [],
				actions: [],
				activeBeacon: ''
			};
		},

		componentWillMount: function() {
			var self = this;
			pubsub.subscribe('game:update:text', function(e, text) {
				self.setState({ text: text });
			});

			pubsub.subscribe('game:update:scene', function(e, title) {
				self.setState({ title: title });
			});


			pubsub.subscribe('game:update:actions', function(e, actions) {
				self.setState({ actions: actions });
			});

		},

		render: function() {
			return (
				/* jshint ignore:start */
				<div className="app">
					<h1>Bavarian Daddy</h1>
					<h2>{this.state.title}</h2>
					<TextWindow
						pubsub={pubsub}
						text={this.state.text}
					/>
				</div>
				/* jshint ignore:end */
			);
		}
	});

	module.exports = Story;

}());
