(function() {
	'use strict';

	var React = require('react');

	var Beacon = React.createClass({

		onClick: function() {
			this.props.pubsub.publish('beacon:click', this.props.name);
		},

		render: function() {
			return (
				<button onClick={this.onClick} className="beacon">
					{this.props.name}
				</button>
			);
		}
	});

	module.exports = Beacon;
}());
