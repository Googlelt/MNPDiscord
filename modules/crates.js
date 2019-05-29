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

    await client.channels.get(json.channel).send(new MessageEmbed()
        .setColor(client.config.color)
        .setTimestamp()
        .setDescription(`**${client.config.economy.currencyName} Crate Drop**\nFirst one to type \`${word}\` gains ${reward} ${client.config.economy.currencyName}.`))

    client.channels.get(json.channel).awaitMessages(message => message.content.toLowerCase() === word, {
        max: 1,
        time: 180000,
        errors: ["time"]
    }).catch(err => {
    return;
    }).then(async collected => {
    let user = collected.first().member.user;
    let userData = await client.userData.get(client, user);

    client.userData.update(client, user.id, {
        name: "balance",
        value: userData.balance + reward
    });

    return client.channels.get(json.channel).send(new MessageEmbed()
        .setColor(client.config.color)
        .setTimestamp()
        .setDescription(`**${client.config.economy.currencyName} Crate Drop**\n${user.username} got the ${client.config.economy.currencyName} crate drop and won ${reward} ${client.config.economy.currencyName}!`));

    });
}