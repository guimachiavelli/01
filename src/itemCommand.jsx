(function() {
	'use strict';

	var React = require('react');

	var ItemCommand = React.createClass({
		onClick: function(e) {
			e.preventDefault();

			this.props.pubsub.publish('game:item:command', {name: this.props.name, item: this.props.item });
		},

		render: function() {
			return (
				<button onClick={this.onClick} className="itemCommand">{this.props.name}</button>
			);
		}

	});

	module.exports = ItemCommand;

}());

