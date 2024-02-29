const FriendlyError = require('./friendly');

/**
 * Has a descriptive message for a command not having proper format
 * @extends {FriendlyError}
 */
class CommandFormatError extends FriendlyError {
	/**
	 * @param {CommandoMessage} msg - The command message the error is for
	 */
	constructor(msg) {
		super(
			`Hey! That's an invalid command usage. The valid way to use \`${msg.command.name}\` is: ${msg.usage(
				msg.command.format,
				msg.guild ? undefined : null,
				msg.guild ? undefined : null
			)}.
			Use ${msg.anyUsage(
				`help ${msg.command.name}`,
				msg.guild ? undefined : null,
				msg.guild ? undefined : null
			)} for more information.`
		);
		this.name = 'CommandFormatError';
	}
}

module.exports = CommandFormatError;
