const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let flip = args[0];
    let amount = args[1];

    if (!flip || !["heads", "tails"].includes(flip)) return msg.channel.send(":x: You have to provide your flip(heads or tails).");

    if (!amount) return msg.channel.send(`:x: You have to provide the amount of ${client.config.economy.currencyName} you would like to gamble.`);

    if (amount > client.config.economy.gamble.max) return msg.channel.send(`:x: Max bet is 2000 ${client.config.economy.currencyName}.`);

    let userData = (await client.db.query(`SELECT * FROM users WHERE id = '${msg.author.id}'`))[0][0];

    if (amount > userData.balance) return msg.reply(`You don't have enough ${client.config.economy.currencyName}.`);

    let generatedNumber = Math.floor(Math.random() * 2) === 0;

    let text = generatedNumber ? "heads" : "tails";

    let newBalance;

    if(text !== flip) {
        newBalance = userData.balance - parseInt(amount);
        msg.channel.send(new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`:white: You lost, ${amount} ${client.config.economy.currencyName} have been taken from your bank account.`)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setThumbnail(client.config.economy.currencyLogo));
    }else {
        newBalance = userData.balance + parseInt(amount);
        msg.channel.send(new MessageEmbed()
            .setColor(client.config.color)
            .setDescription(`:x: You Won, ${amount} ${client.config.economy.currencyName} have been added to your bank account.`)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setThumbnail(client.config.economy.currencyLogo));
    }

    return await client.db.execute(`UPDATE users SET balance = '${newBalance}' WHERE id = '${msg.author.id}'`);
};