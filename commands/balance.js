const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg) => {
    let user = msg.mentions.users.first() || msg.author;

    let userData = await client.userData.get(client, user.id);
    
    return msg.channel.send(client.embeds.twobits(client, msg.author, `You have ${userData.balance} ${client.config.economy.currencyName}`));
};

module.exports.info = {
    description: "view your own/Someone else's balance.",
    aliases: ["bal", "money", "bank"]
};