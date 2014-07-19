(function() {
	'use strict';

	var React = require('react');

	var CommandMenu = require('./commandMenu.jsx'),
		TextWindow = require('./textWindow.jsx'),
		StatusWindow = require('./statusWindow.jsx'),
		PubSub = require('./js/pubsub'),
		Game = require('./js/game');

	var pubsub = new PubSub();
	var game = new Game(pubsub);


	var App = React.createClass({
		getInitialState: function() {
			return {
				text: [],
				items: [],
				commands: []
			};
		},

		componentWillMount: function() {
			var self = this;

			pubsub.subscribe('game:update', function() {
				self.setState({
					text: game.text,
					items: game.items,
					commands: game.commands
				});
			});

		},

		render: function() {
			return (
				/* jshint ignore:start */
				<div className="app">
					<TextWindow text={this.state.text} items={this.state.items} />
					<CommandMenu pubsub={pubsub} commands={this.state.commands} />
				</div>
				/* jshint ignore:end */
			);
		}
	});



	module.exports = App;

}());


