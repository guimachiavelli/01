(function() {
	'use strict';

	var React = require('react');

	var CommandMenu = require('./commandMenu.jsx'),
		TextWindow = require('./textWindow.jsx'),
		StatusWindow = require('./statusWindow.jsx'),
		Game = require('./js/game'),
		Scene = require('./js/scene');


	var scene = new Scene('../src/game/intro.json');
	var game = new Game(scene);


	window.addEventListener('app:command', function(e) {
		console.log(e);
	});


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

			window.addEventListener('scene:loaded', function() {
				console.log(game.scene.text);
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
					<CommandMenu commands={this.state.commands} />
				</div>
				/* jshint ignore:end */
			);
		}
	});



	module.exports = App;

}());


