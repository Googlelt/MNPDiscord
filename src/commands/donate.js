const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let mentionedUser = msg.mentions.users.first() || client.users.get(args[0]);

    if(!mentionedUser) return msg.reply("You must mention the user that you wanna donate to.");

    if(!args[1]) return msg.reply(`You must provide the amount of ${client.config.economy.currencyName} that you want to donate.`);

    if(!Number(args[1])) return msg.reply(`The provided amount is not a number.`);

    let userData = await client.userData.get(client, msg.author.id);
    let mentionedUserData = await client.userData.get(client, mentionedUser.id);
    
    if(args[1] > userData.balance) return msg.reply(`You don't have enough ${client.config.economy.currencyName}.`);

    client.userData.update(client, msg.author.id, { name: "balance", value: userData.balance - parseInt(args[1]) });
    client.userData.update(client, mentionedUser.id, { name: "balance", value: mentionedUserData.balance + parseInt(args[1])});

    return msg.channel.send(client.embeds.twobits(client, msg.author, `Successfully donated ${args[1]} ${client.config.economy.currencyName} to  ${mentionedUser.tag}.`));
};

module.exports.info = {
    aliases: ["give", "pay"],
    description: "@user <amount> - donates the specified amount of TwoBits to the user."
}