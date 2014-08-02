(function() {
	'use strict';

	var React = require('react');

	var Item = require('./item.jsx');

	var ItemList = React.createClass({
		printItems: function(itemsArray) {
			var self = this;

			return itemsArray.map(function(item){
				return (
					<li key={item}>
						<Item
							pubsub={self.props.pubsub}
							name={item}
							type={self.props.type} />
					</li>
				);
			})
		},



		render: function() {
			var items = this.printItems(this.props.items);
			var classes = 'itemList ' + this.props.type;
			var titleClasses = 'itemList-title ' + this.props.type;

			return (
				<span>
					<h2 className={titleClasses}>{this.props.type}</h2>
					<ul className={classes}>
						{items}
					</ul>
				</span>
			)
		}
	});

	module.exports = ItemList;

}());


