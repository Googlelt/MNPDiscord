const Discord = require("discord.js");
const config = require("./config");
const client = new Discord.Client({ fetchAllMembers: true });

client.config = config;
client.constructor = require("./lib/constructor");
client.utils = require("./lib/utils");
client.embeds = require("./lib/embeds");

client.userData = require("./modules/userData");

require("./lib/commandLoader")(client);
require("./lib/databaseLoader")(client);

require("./website/server")(client);

client.on("ready", () => require("./events/ready")(client));
client.on("guildMemberAdd", () => require("./events/guildMemberAdd")(client));
client.on("guildMemberRemove", () => require("./events/guildMemberRemove")(client));
client.on("message", (msg) => require("./events/message")(client, msg));

client.login(config.token);