const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let mentionedUser = msg.mentions.users.first() || client.users.get(args[0]);

    if(!mentionedUser) return msg.reply("You must mention the user that you wanna donate to.");

    if(!args[1]) return msg.reply(`You must provide the amount of ${client.config.economy.currencyName} that you want to donate.`);

    if(!Number(args[1])) return msg.reply(`The provided amount is not a number.`);

    let userData = (await client.db.query(`SELECT * FROM users WHERE id = ${msg.author.id}`))[0][0];
    let mentionedUserData = (await client.db.query(`SELECT * FROM users WHERE id = ${mentionedUser.id}`))[0][0];

    if(args[1] > userData.balance) return msg.reply(`You don't have enough ${client.config.economy.currencyName}.`);

    await client.db.execute(`UPDATE users SET balance = ${userData.balance - parseInt(args[1])} WHERE id = '${msg.author.id}'`);
    await client.db.execute(`UPDATE users SET balance = ${mentionedUserData.balance + parseInt(args[1])} WHERE id = '${mentionedUser.id}'`);

    return msg.channel.send(new MessageEmbed()
        .setColor(client.config.color)
        .setDescription(`Successfully donated ${args[1]} ${client.config.economy.currencyName} to  ${mentionedUser.tag}.`)
        .setAuthor(mentionedUser.username, mentionedUser.displayAvatarURL())
        .setThumbnail(client.config.economy.currencyLogo));
};