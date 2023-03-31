const { WumpusEvent } = require("../../../");

module.exports = WumpusEvent.build({
	name: "to de olho",
	type: "messageCreate",
	scope: "direct",
	run({ client }, message) {
		message.react("👀");
	},
});
