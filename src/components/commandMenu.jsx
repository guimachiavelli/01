(function() {
	'use strict';

	var React = require('react');

	var Command = require('./command.jsx');

	var CommandMenu = React.createClass({

		render: function() {
			var commands = [], self = this;

			commands = this.props.commands.map(function (command, i) {
				return (
					<li key={command}><Command pubsub={self.props.pubsub} name={command} type={self.props.type} /></li>
				)
			});

			if (commands.length < 1) return null;

			return (
				<ul className="commandMenu">
					{commands}
				</ul>
			)
		}
	});

	module.exports = CommandMenu;

}());
