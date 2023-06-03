# Wumpus.d.js

Wumpus.d.js é um framework de discord.js, uma ferramenta poderosa para desenvolver bots de Discord de forma rápida e fácil.

## Estrutura do Projeto

- **`commands/`**: Esta pasta contém os arquivos que definem os comandos do bot.
- **`events/`**: Esta pasta contém os arquivos que definem os eventos do bot.
- **`wumpus.config.js`**: O arquivo de configuração do framework wumpus.d.js.

## Features

- **`Intents Automáticas`**: O framework ativa intents de acordo com os eventos que o usuário utilizar.
- **`Handler de Commands e Events`**: Comandos e eventos são carregados automáticamente
- **`.env`**: Configuração de dotenv integrado
- **`AutoReload`**: Recarrega os comandos e eventos automáticamente caso haja mudanças quando usado o modo dev

## Utilização Básica

Aqui estão alguns exemplos de como utilizar o framework:

**`commands/ping.js`**

```js
const { WumpusCommand } = require("wumpus.d.js");

module.exports = WumpusCommand.build({
	name: "ping",
	description: "Pong!",
	options: [],
	async run({ interaction }) {
		interaction.reply("Pong!");
	},
});
```

---

**`events/observing.js`**

```js
const { WumpusEvent } = require("wumpus.d.js");

module.exports = WumpusEvent.build({
	name: "ObservingYou",
	type: "messageCreate",
	scope: "direct",
	async run({ client }, message) {
		message.react("👀");
	},
});
```
