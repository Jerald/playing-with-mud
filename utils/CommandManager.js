ChatManager = require('./chat.js');

function CommandManager (server, user) {
	var message;
	var packet;

	switch (user.message.command) {
		case 'look':
			message = `You are in ${user.node.name}.\nWhen you look around you see: ${user.node.description}`;

			packet = {
				command: 'writeline',
				message: message
			};

			user.socket.send(JSON.stringify(packet));
			break;

		case 'move':
			let newNode = user.node.connectedNodes[user.message.args[0].toLowerCase()];
			message = `You leave ${user.node.name} and enter ${newNode.name}`;

			user.node = newNode;

			packet = {
				command: 'writeline',
				message: message
			};

			user.socket.send(JSON.stringify(packet));
			break;

		case 'say':
			ChatManager.broadcastToOthers(server, user);
			break;
	}
}

module.exports = CommandManager;
