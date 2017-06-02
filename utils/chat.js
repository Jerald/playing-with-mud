const WebSocket = require('ws');

class ChatManager {
	static broadcastToOthers (server, user) {
		server.clients.forEach(function (client) {
			if (client !== user.socket && client.readyState === WebSocket.OPEN)
			{
				console.log(`${user.username} sent a chat message`);

				let packetObj = {
					command: 'writeline',
					message: user.username + ' says: ' + user.message.args.join(' ').trim()
				};

				client.send(JSON.stringify(packetObj));
			}
		});
	}
}

module.exports = ChatManager;
