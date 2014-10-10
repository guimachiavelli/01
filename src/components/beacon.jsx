(function() {
	'use strict';

	var React = require('react');

	var Beacon = React.createClass({
		render: function() {
			return (
				<button className="command-tree" beaconName={this.props.name}>
					{this.props.name}
				</button>
			);
		}
	});

	module.exports = CommandTree;
}());
