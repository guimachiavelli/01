(function() {
	'use strict';

	var React = require('react');

	var Item = require('./item.jsx');


	var TextWindow = React.createClass({

		showObjects: function(objects) {
			if (!objects) return '';

			return (
				<p>You see: <Item name={objects[0]} /></p>
			);
		},

		render: function() {

			var objs = this.showObjects(this.props.objects);

			console.log(this.props.text);

			return (
				<div className="textWindow">
					{this.props.text}
					{objs}
				</div>
			);
		}
	});

	module.exports = TextWindow;
}());

