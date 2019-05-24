const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg) => {
    let message = await msg.channel.send("Testing");

    message.delete();

    return msg.channel.send(new MessageEmbed()
        .setColor(client.config.color)
        .setDescription(`
            API: ${Math.round(client.ws.ping)}
            MSG: ${(message.editedTimestamp || message.createdTimestamp) - (msg.editedTimestamp || msg.createdTimestamp)}
        `));

    
}

module.exports.info = {
    description: "shows the ping of the bot"
}