(function() {
	'use strict';

	var React = require('react');

	var CommandMenu = React.createClass({

		render: function() {
			var commands = [];

			if (this.props.commands.length) {
				commands = this.props.commands.map(function (command) {
					return (
						<li><a href="#">{command}</a></li>
					)
				});
			}


			return (
				<div className="commandMenu">
					{commands}
				</div>
			)
		}
	});

	module.exports = CommandMenu;

}());

