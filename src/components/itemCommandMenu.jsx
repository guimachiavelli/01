(function() {
	'use strict';

	var React = require('react');

	var ItemCommand = require('./itemCommand.jsx');

	var ItemCommandMenu = React.createClass({

		render: function() {
			var commands = [], self = this;

			commands = this.props.commands.map(function (command, i) {
				//FIXME: key should be a string
				return (
					<li key={i}>
						<ItemCommand
							pubsub={self.props.pubsub}
							name={command}
							item={self.props.item}
							context={self.props.context} />
					</li>
				)
			});

			if (commands.length < 1) return null;

			return (
				<ul className="itemCommandMenu">
					{commands}
				</ul>
			)
		}
	});

	module.exports = ItemCommandMenu;

}());

