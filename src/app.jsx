(function() {
	'use strict';

	var React = require('react');

	var CommandMenu = require('./commandMenu.jsx'),
		TextWindow = require('./textWindow.jsx'),
		StatusWindow = require('./statusWindow.jsx');

	var App = React.createClass({
		getInitialState: function() {
			return {
				scene: {}
			};
		},

		componentWillMount: function() {
			var request, data, self = this;


			request = new XMLHttpRequest();
			request.open('GET', this.props.url, true);

			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					self.setState({scene: JSON.parse(request.responseText)});
				} else {
				// We reached our target server, but it returned an error
			  }
			};

			request.onerror = function() {
			  // There was a connection error of some sort
			};

			request.send();

			return data;

		},

		render: function() {
			return (
				/* jshint ignore:start */
				<div className="app">
					<TextWindow />
					<StatusWindow />
					<CommandMenu commands={this.state.scene.setup} />
				</div>
				/* jshint ignore:end */
			);
		}
	});

	module.exports = App;

})();


