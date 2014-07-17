(function() {
	'use strict';

	var React = require('react');

	var Command = require('./command.jsx');

	var CommandMenu = React.createClass({

		onCommandClick: function(command)  {
			this.props.onCommand(command);
		},

		render: function() {
			var commands = [], self = this;

			if (this.props.commands.length) {
				commands = this.props.commands.map(function (command) {
					return (
						<li><Command onCommandClick={self.onCommandClick} name={command} /></li>
					)
				});
			}


			return (
				<ul className="commandMenu">
					{commands}
				</ul>
			)
		}
	});

	module.exports = CommandMenu;

}());

