const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg) => {
    let leaderboardString = ``;
    let counted = 0;

    (await client.db.raw.query(`SELECT * FROM users ORDER BY balance DESC LIMIT 10`))[0].map(row => {
        let user = client.users.get(row.id);
        if(!user) return;

        counted += 1;

        return leaderboardString = `${leaderboardString}\n${counted} - ${user.tag}: ${row.balance}`;
    });

    return msg.channel.send(new MessageEmbed()
        .setColor(client.config.color)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .addField(`${client.config.economy.currencyName} Leaderboard`, leaderboardString)
        .setFooter(`Notice: The #1 position on the leaderboard will receive 1 month of nitro and everyone's ${client.config.economy.currencyName} will reset every month on the 1st`));
};

module.exports.info = {
    description: "shows the top 10 people with the most TwoBits."
}