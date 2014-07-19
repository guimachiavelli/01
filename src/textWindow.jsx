(function() {
	'use strict';

	var React = require('react');

	var Item = require('./item.jsx');


	var TextWindow = React.createClass({

		showObjects: function(objects) {
			if (!objects) return '';

			return (
				<p key="1">You see: <Item name={objects[0]} /></p>
			);
		},

		printText: function(textArray) {
			if (textArray.length < 1) return;

			return textArray.map(function(text, i){
				return (
					<p key={i}>{text}</p>
				);
			})

		},

		componentDidUpdate: function() {
			var el = this.getDOMNode();
			el.scrollTop = el.scrollHeight;
		},

		render: function() {
			var objs, text;

			objs = this.showObjects(this.props.objects);
			text = this.printText(this.props.text);

			return (
				<div className="textWindow">
					{text}
					{objs}
				</div>
			);
		}
	});

	module.exports = TextWindow;
}());

