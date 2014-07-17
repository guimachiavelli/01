(function() {
	'use strict';

	var React = require('react');

	var Item = React.createClass({

		render: function() {
			return (
				<button className="Item">{this.props.name}</button>
			);
		}

	});

	module.exports = Item;

}());
