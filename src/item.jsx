(function() {
	'use strict';

	var React = require('react');

	var Item = React.createClass({

		onClick: function(e) {
			e.preventDefault();
			console.log(this);
		},

		render: function() {
			return (
				<button onClick={this.onClick} className="Item">{this.props.name}</button>
			);
		}

	});

	module.exports = Item;

}());
