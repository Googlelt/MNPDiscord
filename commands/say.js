const { MessageEmbed } = require("discord.js");

module.exports.run = (client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply(client.constructor.permissions("Manage Messages"));

    if(!args.join(" ")) return msg.reply("You must provide the content of the message.");

    msg.delete();

    return msg.channel.send(new MessageEmbed()
        .setColor(client.config.color)
        .setTimestamp()
        .setDescription(args.join(" ")))
    // return msg.channel.send(args.join(" "));
};

module.exports.info = {
    admin: true
};