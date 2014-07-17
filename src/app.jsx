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
				//XXX not too sure about this callback
				scene: new Scene('../src/game/intro.json', this.setState.bind(this))
			};
		},

		//FIXME this whole part makes no sense at all
		onCommand: function(command) {
			var exec = this.state.scene.executeCommand(command, this.setState.bind(this));
			this.setState({scene: new Scene('../src/game/' + exec.leadsTo + '.json', this.setState.bind(this))})
		},

		render: function() {
			return (
				/* jshint ignore:start */
				<div className="app">
					<TextWindow text={this.state.scene.text} objects={this.state.scene.objects} />
					<CommandMenu onCommand={this.onCommand} commands={this.state.scene.commands} />
				</div>
				/* jshint ignore:end */
			);
		}
	});

	module.exports = App;

}());


