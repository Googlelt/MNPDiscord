const { MessageEmbed } = require("discord.js");

module.exports.run = (client, msg) => {
    return msg.channel.send(new MessageEmbed()
    .setColor(client.config.color)
    .setAuthor(msg.guild.name, msg.guild.iconURL())
    .setTimestamp()
    .setFooter(`ID: ${msg.guild.id}, Server Created: ${msg.guild.createdAt.toDateString()},`)
    .addField("Owner", msg.guild.owner.user.tag, true)
    .addField("Owner ID", msg.guild.owner.id, true)
    .addField("Region", msg.guild.region, true)
    .addField("Members", msg.guild.members.size, true)
    .addField("Humans", msg.guild.members.filter(member => !member.user.bot).size, true)
    .addField("Bots", msg.guild.members.filter(member => member.user.bot).size, true)
    .addField("Online", msg.guild.members.filter(member => member.user.presence.status !== "offline").size, true)
    .addField("Categories", msg.guild.channels.filter(channel => channel.type === "category").size, true)
    .addField("Text Channels", msg.guild.channels.filter(channel => channel.type === "text").size, true)
    .addField("Voice Channels", msg.guild.channels.filter(channel => channel.type === "voice").size, true)
    );
};

module.exports.info = {
    description: "detailed information about the server."
}