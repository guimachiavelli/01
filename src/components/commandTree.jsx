(function() {
	'use strict';

	var React = require('react');

	var Beacon = require('./beacon.jsx');

	var CommandTree = React.createClass({
		printActions: function() {
			if (this.props.actions.length < 1) return '';

			var self = this;

			return this.props.actions.map(function(action) {
				return (
					<Beacon key={action} pubsub={self.props.pubsub} name={action}>
						{action}
					</Beacon>
				);
			});
		},

		render: function() {
			var actions = this.printActions();
			return (
				<nav className="command-tree">
					{actions}
				</nav>
			);
		}
	});

	module.exports = CommandTree;
}());

