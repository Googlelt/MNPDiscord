const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg) => {
    let userData = await client.db.query(`SELECT * FROM users WHERE id = '${msg.author.id}'`);

    userData.lastDaily = parseInt(userData.lastDaily);

    let time = Date.now() - userData.lastDaily > 86400000;
    
    let msgContent;

    if(time) {
        client.userData.update(client, msg.author.id, [{
                name: "balance",
                value: userData.balance + client.config.economy.dailyAmount
            },
            {
                name: "lastDaily",
                value: Date.now()
            }
        ]);

        msgContent = `:white_check_mark: Claimed your daily ${client.config.economy.dailyAmount} TwoBits.`;
    }else {
        msgContent = `:x: You can claim your daily again in ${client.utils.convertTime(parseInt(Date.now() - userData.lastDaily - 86400000).toString().replace("-", ""))}.`;
    }

    return msg.channel.send(client.embeds.twobits(client, msg.author, msgContent));
};

module.exports.info = {
    description: "collects your daily TwoBits."
}