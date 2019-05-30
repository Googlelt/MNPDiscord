const { MessageEmbed } = require("discord.js");
const randomInt = require("random-int");

module.exports.run = async (client) => {
    setInterval(async () => {
        runLoop(client);
    }, 600000);
}

module.exports.force = runLoop;

async function runLoop(client) {
    let json = JSON.parse((await client.db.query("SELECT * FROM SETTINGS where name = 'drop'")).value);

    if (!json.enabled) return;
    let word = client.config.airdrop.words[Math.floor(Math.random() * client.config.airdrop.words.length)];
    let reward = randomInt(20, 35);
    let channel = client.channels.get(json.channel);

    await channel.send(new MessageEmbed()
        .setColor(client.config.color)
        .setTimestamp()
        .setDescription(`**${client.config.economy.currencyName} Crate Drop**\nFirst one to type \`${word}\` gains ${reward} ${client.config.economy.currencyName}.`))

    channel.awaitMessages(message => message.content.toLowerCase() === word, {
        max: 1,
        time: 180000,
        errors: ["time"]
    }).then(async collected => {
        if(!collected) return;
        let user = collected.first().member.user;
        let userData = await client.userData.get(client, user.id);

        client.userData.update(client, user.id, {
            name: "balance",
            value: userData.balance + reward
        });

        return channel.send(new MessageEmbed()
            .setColor(client.config.color)
            .setTimestamp()
            .setDescription(`**${client.config.economy.currencyName} Crate Drop**\n${user.username} got the ${client.config.economy.currencyName} crate drop and won ${reward} ${client.config.economy.currencyName}!`));
    }).catch(err => {
        return channel.send(`No one got the crate, Better luck next time.`);
    });
}