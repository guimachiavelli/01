(function() {
	'use strict';

	var Items = function() {

	};

	Items.prototype.getItems = function(items, itemDumpster) {
		var i, len, availableItems;

		i = 0;
		len = items.length;
		availableItems =[];

		while (i < len) {
			if (itemDumpster.indexOf(items[i]) === -1) {
				availableItems.push(items[i]);
			}
			i += 1;
		}

		return availableItems;
	};


	Items.prototype.getItemCommand = function(command, sceneItems, libraryItems) {
		if (sceneItems[command.item] &&
			sceneItems[command.item].actions[command.name]
		) {
			return sceneItems[command.item].actions[command.name];
		}

		if (libraryItems[command.item] &&
			libraryItems[command.item].actions[command.name]
		) {
			return libraryItems[command.item].actions[command.name];
		}

		return false;
	};


	Items.prototype.makeItemCommandList = function(commandsObject) {
		var command, commandArray = [];

		for (command in commandsObject) {
			if (!commandsObject.hasOwnProperty(command)) {
				continue;
			}
			commandArray.push(command);
		}

		return commandArray;
	};

	Items.prototype.getItemCommands = function(item, sceneItems, libraryItems) {
		if (sceneItems[item]) {
			return sceneItems[item].actions;
		}

		if (libraryItems[item]) {
			return libraryItems[item].actions;
		}

		return false;
	};


	module.exports = Items;


}());
