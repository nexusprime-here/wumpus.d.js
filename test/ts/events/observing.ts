import { WumpusEvent } from "../../../";

export default WumpusEvent.build({
	name: "ObservingYou",
	type: "messageCreate",
	scope: "guild",
	async run({ client }, message) {
		message.react("👀");
	},
});
