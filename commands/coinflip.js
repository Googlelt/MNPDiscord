const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let flip = args[0];
    let amount = args[1];

    if (!flip || !["heads", "tails"].includes(flip)) return msg.channel.send(":x: You have to provide your flip(heads or tails).");

    if (!amount) return msg.channel.send(`:x: You have to provide the amount of ${client.config.economy.currencyName} you would like to gamble.`);

    if (amount > client.config.economy.gamble.max) return msg.channel.send(`:x: Max bet is 2000 ${client.config.economy.currencyName}.`);

    let userData = await client.db.query(`SELECT * FROM users WHERE id = '${msg.author.id}'`);

    if (amount > userData.balance) return msg.reply(`You don't have enough ${client.config.economy.currencyName}.`);

    let generatedNumber = Math.floor(Math.random() * 2) === 0;

    let text = generatedNumber ? "heads" : "tails";

    let newBalance;
    let msgContent;

    if(text !== flip) {
        newBalance = userData.balance - parseInt(amount);

        msgContent = `:x: You lost, ${amount} ${client.config.economy.currencyName} have been taken from your bank account.`;
    }else {
        newBalance = userData.balance + parseInt(amount);
        
        msgContent = `:white_check_mark: You Won, ${amount} ${client.config.economy.currencyName} have been added to your bank account.`;
    }

    await client.db.execute(`UPDATE users SET balance = '${newBalance}' WHERE id = '${msg.author.id}'`);

    return msg.channel.send(client.embeds.twobits(client, msg.author, msgContent));
};