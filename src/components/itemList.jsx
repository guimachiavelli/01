(function() {
	'use strict';

	var React = require('react');

	var Item = require('./item.jsx');

	var ItemList = React.createClass({
		printItems: function(itemsArray) {
			var self = this;

			return itemsArray.map(function(item){
				return (
					<li key={item}><Item pubsub={self.props.pubsub} name={item} /></li>
				);
			})
		},



		render: function() {
			var items = this.printItems(this.props.items);

			return (
				<ul className="itemList">
					{items}
				</ul>
			)
		}
	});

	module.exports = ItemList;

}());


