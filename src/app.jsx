(function() {
	'use strict';

	var React = require('react');

	var CommandMenu = require('./commandMenu.jsx'),
		TextWindow = require('./textWindow.jsx'),
		StatusWindow = require('./statusWindow.jsx'),
		Scene = require('./js/scene');

	var App = React.createClass({
		getInitialState: function() {
			return {
				scene: new Scene('../src/game/intro.json')
			};
		},

		componentDidMount: function() {
			this.setState({scene: new Scene('../src/game/intro.json')})
			console.log(this.state.scene);
		},

		render: function() {
			return (
				/* jshint ignore:start */
				<div className="app">
					<TextWindow text={this.state.scene.text} objects={this.state.scene.objects} />
					<CommandMenu commands={this.state.scene.commands} />
				</div>
				/* jshint ignore:end */
			);
		}
	});

	module.exports = App;

}());


