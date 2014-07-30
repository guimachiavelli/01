(function() {
	'use strict';

	var React = require('react');

	var ItemList = require('./itemList.jsx');

	var TextWindow = React.createClass({

		printText: function(textArray) {
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
			var text = this.printText(this.props.text);

			return (
				<div className="textWindow">
					{text}
					<br />
					You see: <ItemList
								pubsub={this.props.pubsub}
								items={this.props.items}
								type="scene"/>
				</div>
			);
		}
	});

	module.exports = TextWindow;
}());

