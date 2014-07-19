(function() {
	'use strict';

	var React = require('react');

	var Item = require('./item.jsx');

	var ItemList = React.createClass({
		printItems: function(itemsArray) {
			return itemsArray.map(function(item, i){
				return (
					<li key={i}><Item name={item} /></li>
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


