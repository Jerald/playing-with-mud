'use strict';

function LoginManager(user, loginPacket, startingNode) {
	user.username = loginPacket.username;
	user.node = startingNode;
}

module.exports = LoginManager;
