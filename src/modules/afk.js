module.exports = async (client, msg, authorData) => {
    if(authorData.afk_enabled === 1) {
        if((authorData.afk_lastMessageDate - Date.now()) < 30000) {
            await client.db.execute(`UPDATE users SET afk_enabled = '0' WHERE id = '${msg.author.id}'`);

            if(client.config.debug) {
                console.log(`Removed ${msg.author.tag}'s afk`);
            }

            msg.reply(`Your afk has been removed. time: ${client.utils.convertTime(Date.now() - authorData.afk_date)}.`);
        }

        await client.db.execute(`UPDATE users SET afk_lastMessageDate = '${Date.now()}' WHERE id = '${msg.author.id}'`);
    }

    if(msg.mentions.users.size < 1) return;

    msg.mentions.users.map(async user => {
        let userData = (await client.db.query(`SELECT * FROM users WHERE id = '${user.id}'`))[0][0];

        if(userData.afk_enabled === 0) return;

        if(client.config.debug) {
            console.log(`Told ${msg.author.tag} that ${user.tag} is afk`);
        }

        return msg.reply(`${client.utils.capitalize(user.username)} is afk, time: ${client.utils.convertTime(Date.now() - userData.afk_date)}, reason: ${userData.afk_reason}.`);
    });
};