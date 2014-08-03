(function() {
	'use strict';

	var Commands = function() {

	};

	Commands.prototype.getCommands = function(commandList, revealedCommands, deletedCommands) {
		deletedCommands = deletedCommands ? deletedCommands : [];

		if (revealedCommands && revealedCommands.length > 0) {
			commandList = commandList.concat(revealedCommands);
		}

		return commandList.filter(function(item) {
									return deletedCommands.indexOf(item) === -1;
								 });
	};

	module.exports = Commands;

}());
