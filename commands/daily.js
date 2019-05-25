const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg) => {
    let userData = await client.db.query(`SELECT * FROM users WHERE id = '${msg.author.id}'`);

    userData.lastDaily = parseInt(userData.lastDaily);

    let time = Date.now() - userData.lastDaily > 86400000;

    if(time) {
        await client.db.execute(`UPDATE users SET balance = ${userData.balance + client.config.economy.dailyAmount}, lastDaily = '${Date.now()}' WHERE id = '${msg.author.id}'`);

        return msg.channel.send(new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`:white_check_mark: Claimed your daily ${client.config.economy.dailyAmount} TwoBits.`)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setThumbnail(client.config.economy.currencyLogo));
    }else {
        return msg.channel.send(new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`:x: You can claim your daily again in ${client.utils.convertTime(parseInt(Date.now() - userData.lastDaily - 86400000).toString().replace("-", ""))}.`)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setThumbnail(client.config.economy.currencyLogo));
    }
};