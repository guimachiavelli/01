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

		printItems: function(itemsArray, pubsub) {
			if (!itemsArray || itemsArray.length < 1) { return; }
			return (
				<div>
					<br />
					You see: <ItemList
								pubsub={pubsub}
								items={itemsArray}
								type="scene"/>
				</div>
			);
		},

		componentDidUpdate: function() {
			var el = this.getDOMNode();
			el.scrollTop = el.scrollHeight;
		},

		render: function() {
			var text = this.printText(this.props.text);
			var items = this.printItems(this.props.items, this.props.pubsub);

			return (
				<div className="textWindow">
					{text}
					{items}
				</div>
				);
		}
	});

	module.exports = TextWindow;
}());
