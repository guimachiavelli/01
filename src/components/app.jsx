(function() {
	'use strict';

	var React = require('react');

	var CommandMenu = require('./commandMenu.jsx'),
		ItemCommandMenu = require('./itemCommandMenu.jsx'),
		TextWindow = require('./textWindow.jsx'),
		StatusWindow = require('./statusWindow.jsx'),
		ItemList = require('./itemList.jsx'),
		PubSub = require('../js/pubsub'),
		Game = require('../js/game');

	var pubsub = new PubSub();
	var game = new Game(pubsub);

	var App = React.createClass({
		getInitialState: function() {
			return {
				text: [],
				items: [],
				commands: [],
				itemCommands: [],
				inventory: [],
				activeItem: {name: null, type: null}
			};
		},

		componentWillMount: function() {
			var self = this;
			pubsub.subscribe('game:update', function() {
				self.setState({
					text: game.text,
					items: game.items,
					commands: game.commands,
					itemCommands: game.itemCommands,
					activeItem: game.activeItem,
					inventory: game.inventory
				});
			});

		},

		render: function() {
			return (
				/* jshint ignore:start */
				<div className="app">
					<ItemList
						pubsub={pubsub}
						items={this.state.inventory}
						type="inventory" />
					<TextWindow
						pubsub={pubsub}
						text={this.state.text}
						items={this.state.items} />
					<CommandMenu
						pubsub={pubsub}
						commands={this.state.commands} />
					<ItemCommandMenu
						pubsub={pubsub}
						commands={this.state.itemCommands}
						item={this.state.activeItem.name}
						context={this.state.activeItem.type} />


				</div>
				/* jshint ignore:end */
			);
		}
	});



	module.exports = App;

}());


