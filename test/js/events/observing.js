const { WumpusEvent } = require("../../../");

module.exports = WumpusEvent.build({
	name: "ObservingYou",
	type: "messageCreate",
	scope: "direct",
	async run({ client }, message) {
		message.react("👀");
	},
});
