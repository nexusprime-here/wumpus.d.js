/** @type {import('../typings').WumpusConfig} */
const config = {
    "handlers": {
        "commands": true,
        "events": true
    },
    "intents": [
        "Guilds",
        "GuildMessages"
    ],
    "embeds": {
        "warn": {
            "showAuthor": false,
            "footer": "sexo",
            "color": "DarkAqua"
        }
    },
}

module.exports = config;