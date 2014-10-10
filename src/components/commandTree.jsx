(function() {
	'use strict';

	var React = require('react');

	var CommandTree = React.createClass({
		render: function() {
			return (
				<nav className="command-tree">
					{this.props.beacon}
				</nav>
				);
		}
	});

	module.exports = CommandTree;
}());

