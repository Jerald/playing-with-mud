const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', function (socket) {
	var userObject = {
		socket: socket
	};

	console.log('Connection made!');

	socket.on('message', function (data) {
		let parsedData = JSON.parse(data);

		if (parsedData.command === 'readline') {
			if (userObject.username === undefined) {
				console.log('User\'s username is not authenticated correctly! ERROR ERROR ERROR');
			} else {
				console.log('I got an input of: ' + parsedData.input);
				parseReadLine(userObject, parsedData);
			}
		} else if (parsedData.command === 'login') {
			userObject.username = parsedData.username;
			console.log('User logged in with username: ' + userObject.username);
		}
	});

	// let packetObj = {
	// 	command: 'writeline',
	// 	message: 'Hello World!'
	// };
	//
	// socket.send(JSON.stringify(packetObj));
});

function parseReadLine (user, data) {
	if (data.input.split(' ')[0] === 'say') {
		broadcastToOthers(user, data);
	}
}

function broadcastToOthers (user, data) {
	server.clients.forEach(function (client) {
		if (client !== user.socket && client.readyState === WebSocket.OPEN) {
			console.log(user.username);

			let message = data.input.split(' ');
			message.splice(0, 1);

			let packetObj = {
				command: 'writeline',
				message: user.username + ' says: ' + message.join(' ').trim()
			};

			client.send(JSON.stringify(packetObj));
		}
	});
}
