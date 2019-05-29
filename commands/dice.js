const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg, args) => {
    if(!args[0]) return msg.reply("You must provide a number between 1-6.");
    if(!Number(args[0])) return msg.reply("Invalid number.");
    if(!parseInt(args[0]) > 6) return msg.reply("You can only bet between 1-6.");

    if(!args[1]) return msg.reply("You need to provide the amount of money you want to gamble.");
    if(!Number(args[1])) return msg.reply("Invalid number.");

    let userData = await client.db.query(`SELECT * FROM users WHERE id = '${msg.author.id}'`);

    if(parseInt(args[1]) > userData.balance) return msg.reply(`You don't have enough ${client.config.economy.currencyName} to do that.`);

    let result = Math.floor((Math.random() * 6) + 1);

    if(result === parseInt(args[0])) {
        await client.db.execute(`UPDATE users SET balance = '${userData.balance + parseInt(args[1])}' WHERE id = '${msg.author.id}'`);

        return msg.channel.send(client.embeds.twobits(client, msg.author, `:white_check_mark: You Won, ${args[1]} ${client.config.economy.currencyName} have been added to your bank account.`));
    }else {
        await client.db.execute(`UPDATE users SET balance = '${userData.balance - parseInt(args[1])}' WHERE id = '${msg.author.id}'`);

        return msg.channel.send(client.embeds.twobits(client, msg.author, `:x: You lost, ${args[1]} ${client.config.economy.currencyName} have been taken from your bank account.`));
    }
}