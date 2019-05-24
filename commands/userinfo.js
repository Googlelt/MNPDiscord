const { MessageEmbed } = require("discord.js");

module.exports.run = (client, msg, args) => {
    let user = msg.mentions.users.first() || client.users.get(args[0]) || msg.author;
    let member = msg.guild.members.get(user.id);

    let permissionsString = "";
    member.permissions.toArray().map(permission => permissionsString = `${permissionsString} ${client.utils.capitalize(permission.replace("_", " ").toLowerCase())},`);

    return msg.channel.send(new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setTimestamp()
        .addField("Username", user.username, true)
        .addField("ID", user.id, true)
        .addField("Discriminator", user.discriminator, true)
        .addField("Created", user.createdAt.toDateString(), true)
        .addField("Joined", member.joinedAt.toDateString(), true)
        .addField("Highest role", member.roles.highest.name || "none", true)
        .addField("Permissions", permissionsString, true)
    );
};