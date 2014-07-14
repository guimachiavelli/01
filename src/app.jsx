(function() {
	'use strict';

	var React = require('react');

	var CommandMenu = require('./commandMenu.jsx'),
		TextWindow = require('./textWindow.jsx'),
		StatusWindow = require('./statusWindow.jsx');

	var App = React.createClass({
		getInitialState: function() {
			return {
				info: {},
				commands: {},
				text: {},
				objects: {}
			};
		},

		componentWillMount: function() {
			var request, scene, self = this;

			request = new XMLHttpRequest();
			request.open('GET', this.props.url, true);

			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					scene = JSON.parse(request.responseText);
					self.setState({
						info: scene.info,
						commands: scene.setup.commands,
						objects: scene.setup.available_objects,
						text: scene.setup.output
					});
				} else {
				// We reached our target server, but it returned an error
			  }
			};

			request.onerror = function() {
			  // There was a connection error of some sort
			};

			request.send();
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

})();


