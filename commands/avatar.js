const { MessageEmbed } = require("discord.js");

module.exports.run = (client, msg, args) => {
    let user = msg.mentions.users.first() || client.users.get(args[0]) || msg.author;

    return msg.channel.send(new MessageEmbed()
    .setColor(client.config.color)
    .setTitle(`${client.utils.capitalize(user.username)}'s Avatar`)
    .setImage(user.displayAvatarURL({ size: 1024 }))
    .setTimestamp())
};