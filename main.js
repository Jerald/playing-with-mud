const Node = require('./utils/node.js');
const CommandParser = require('./utils/CommandParser.js');
const CommandManager = require('./utils/CommandManager.js');
const LoginManager = require('./utils/LoginManager.js');

const WebSocket = require('ws');

var port;
if (process.argv[2] !== undefined) {
	port = process.argv[2];
} else {
	port = 8080;
}
const server = new WebSocket.Server({ port: port });

var homeNode = setupWorld();

server.on('connection', function (socket) {
	var user = {
		socket: socket, // Socket which the user is connected on
		username: '',   // Username given to the user
		node: {},       // Node where the user is currently
		message: {}     // Last message the user sent, parsed by CommandParser
	};

	console.log('Connection made!');

	socket.on('message', function (rawPacket) {
		let packet = JSON.parse(rawPacket);

		if (packet.command === 'login')
		{
			LoginManager(user, packet, homeNode);
			console.log(`${user.username} logged in at location '${homeNode.name}'`);
		}
		else if (packet.command === 'readline')
		{
			if (user.username === undefined)
			{
				console.log('[ERROR] Client sending commands without authenicating!');
			}
			else
			{
				user.message = CommandParser.parseInput(packet.input);
				console.log(`${user.username} sent message '${user.message._rawMessage}'`);
				CommandManager(server, user);
			}
		}
		else
		{
			console.log('[ERROR] Client sending weird commands!');
		}
	});
});

function setupWorld() {
	let connectedNodes = {
		north: new Node('North of Center'),
		east: new Node('East of Center'),
		south: new Node('South of Center'),
		west: new Node('West of Center')
	};

	let mainNode = new Node('Center of the World', connectedNodes);

	mainNode.description = 'The place where every journey starts. The center of everything there is and everything there ever was.';

	return mainNode;
}
