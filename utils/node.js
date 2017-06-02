class Node {
	constructor (name, connectedNodes) {
		this.name = name;
		this.connectedNodes = connectedNodes;
	}

	get name () {
		return this._name;
	}
	set name (name) {
		// Bothersome ES6 class implementation details require _name
		this._name = name;
	}

	get connectedNodes () {
		return this._connectedNodes;
	}
	set connectedNodes (connectedNodes) {
		// Same as with _name, ES6 annoyances require this to be _connectedNodes
		this._connectedNodes = connectedNodes;
	}

	get description () {
		return this._description;
	}
	set description (description) {
		this._description = description;
	}

	isCommand (commandName) {
		return this.commands[commandName] !== undefined;
	}
}

module.exports = Node;
