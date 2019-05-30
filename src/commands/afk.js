module.exports.run = async (client, msg, args) => {
    let userData = (await client.db.query(`SELECT * FROM users WHERE id = '${msg.author.id}'`))[0][0];

    if(userData.afk_enabled !== 1) {
        await client.db.execute(`UPDATE users SET afk_enabled = '1', afk_reason = '${args.join(" ") || "none"}', afk_date = '${Date.now()}', afk_lastMessageDate = '${Date.now() - 30000}' WHERE id = '${msg.author.id}'`);

        return msg.reply("You are now afk.");
    }else {
        await client.db.execute(`UPDATE users SET afk_enabled = '0' WHERE id = '${msg.author.id}'`);

        return msg.reply("I removed your afk");
    }
};

module.exports.info = {
    admin: true
}