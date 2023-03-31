const { WumpusEvent } = require("../../../");

module.exports = WumpusEvent.build({
	name: "to de olho",
	type: "messageCreate",
	run({ client }, message) {
		message.react("👀");
	},
});
