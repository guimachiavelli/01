(function() {
	'use strict';

	var Commands = function() {

	};

	Commands.prototype.getCommands = function(commandList, revealedCommands) {
		if (revealedCommands && revealedCommands.length > 0) {
			return commandList.concat(revealedCommands);
		}
		return commandList;
	};

	module.exports = Commands;
}());
