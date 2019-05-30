const { MessageEmbed } = require("discord.js");

module.exports.twobits = (client, user, text) => {
    return new MessageEmbed()
        .setColor(client.config.color)
        .setDescription(text)
        .setAuthor(user.username, user.displayAvatarURL())
        .setThumbnail(client.config.economy.currencyLogo);
}