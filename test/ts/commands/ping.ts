import { WumpusCommand } from "../../../";

export default WumpusCommand.build({
	name: "ping",
	description: "Pong!",
	options: [],
	async run({ interaction }) {
		interaction.reply("Pong!");
	},
});
