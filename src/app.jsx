(function() {
	'use strict';

	var React = require('react');

	var CommandMenu = require('./commandMenu.jsx'),
		TextWindow = require('./textWindow.jsx'),
		StatusWindow = require('./statusWindow.jsx'),
		PubSub = require('./js/pubsub'),
		Game = require('./js/game'),
		Scene = require('./js/scene');

	var pubsub = new PubSub();
	var scene = new Scene('../src/game/intro.json', pubsub);
	var game = new Game(scene, pubsub);


	var App = React.createClass({
		getInitialState: function() {
			return {
				text: '',
				objects: [],
				commands: []
			};
		},

		componentWillMount: function() {
			var self = this;

			pubsub.subscribe('scene:loaded', function() {
				self.setState({
					text: game.scene.text,
					objects: game.scene.available_objects,
					commands: game.scene.commands
				})
			});
		},

		render: function() {
			return (
				/* jshint ignore:start */
				<div className="app">
					<TextWindow text={this.state.text} objects={this.state.objects} />
					<CommandMenu pubsub={pubsub} commands={this.state.commands} />
				</div>
				/* jshint ignore:end */
			);
		}
	});



	module.exports = App;

}());


