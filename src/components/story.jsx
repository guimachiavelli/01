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
				text: [],
				commands: [],
				activeBeacon: 'test'
			};
		},

		componentWillMount: function() {
			var self = this;
			pubsub.subscribe('game:update', function(e, text) {
				self.setState({
					text: text
				});
			});

		},

		render: function() {
			return (
				/* jshint ignore:start */
				<div className="app">
					<TextWindow
						pubsub={pubsub}
						text={this.state.text}
					/>
					<CommandTree
						pubsub={pubsub}
						beacon={this.state.activeBeacon}
					/>
				</div>
				/* jshint ignore:end */
			);
		}
	});

	module.exports = Story;

}());
