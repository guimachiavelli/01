(function() {
	'use strict';

	var React = require('react');

	var Command = React.createClass({
		onClick: function(e) {
			e.preventDefault();

			this.props.pubsub.publish('game:scene:command', this.props.name);
		},

		render: function() {
			return (
				<button onClick={this.onClick} className="Item">{this.props.name}</button>
			);
		}

	});

	module.exports = Command;

}());
