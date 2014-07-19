(function() {
	'use strict';

	var React = require('react');

	var Item = React.createClass({

		onClick: function(e) {
			e.preventDefault();
			this.props.pubsub.publish('item:clicked', this.props.name);
		},

		render: function() {
			return (
				<button onClick={this.onClick} className="Item">{this.props.name}</button>
			);
		}

	});

	module.exports = Item;

}());
