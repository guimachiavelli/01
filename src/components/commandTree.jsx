(function() {
	'use strict';

	var React = require('react');

	var Beacon = require('./beacon.jsx');

	var CommandTree = React.createClass({
		printActions: function() {
			if (this.props.actions.length < 1) return '';

			var self = this;

			return this.props.actions.map(function(action) {
				var actionName = Object.keys(action)[0];
				return (
					<Beacon pubsub={self.props.pubsub} name={actionName}>
						actionName
					</Beacon>
				);
			});
		},

		render: function() {
			var actions = this.printActions();
			console.log(actions);
			return (
				<nav className="command-tree">
					{actions}
				</nav>
			);
		}
	});

	module.exports = CommandTree;
}());

