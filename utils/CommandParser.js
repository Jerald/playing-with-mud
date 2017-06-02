class CommandParser {
	static parseInput (input) {
		let parsedInput = input.trim();
		parsedInput = parsedInput.split(' ');

		let outputObj = {
			command: parsedInput[0],
			args: parsedInput.slice(1),
			_rawMessage: parsedInput.join(' ')
		};

		return outputObj;
	}
}

module.exports = CommandParser;
