const { WumpusCommand } = require("../../../");

module.exports = WumpusCommand.build({
	name: "ping",
	description: "Pong!",
	options: [],
	async run({ interaction }) {
		interaction.reply("Pong!");
	},
});
