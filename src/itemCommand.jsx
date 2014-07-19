(function() {
	'use strict';

	var React = require('react');

	var ItemCommand = React.createClass({
		onClick: function(e) {
			e.preventDefault();

			console.log('item command click');

			//this.props.pubsub.publish('game:item:command', this.props.name);
		},

		render: function() {
			return (
				<button onClick={this.onClick} className="itemCommand">{this.props.name}</button>
			);
		}

	});

	module.exports = ItemCommand;

}());

