const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg) => {
    let user = msg.mentions.users.first() || msg.author;

    let userData = await client.db.query(`SELECT * FROM users WHERE id = '${user.id}'`);
    
    return msg.channel.send(new MessageEmbed()
        .setColor(client.config.color)
        .setDescription(`You have ${userData.balance} ${client.config.economy.currencyName}`)
        .setAuthor(user.username, user.displayAvatarURL())
        .setThumbnail(client.config.economy.currencyLogo));
};

module.exports.info = {
    description: "shows your/person their balance"
};