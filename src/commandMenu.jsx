(function() {
	'use strict';

	var React = require('react');

	var CommandMenu = React.createClass({

		render: function() {
			var link = '';
			if (this.props.commands) {
				link = this.props.commands.commands[0];
			}

			return (
				<div className="commandMenu" test={this.props}>
					<li><a href="#">{link}</a></li>
				</div>
			)
		}
	});

	module.exports = CommandMenu;

}());

