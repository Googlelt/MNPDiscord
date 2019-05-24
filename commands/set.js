module.exports.run = async (client, msg, args) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) return;

    let mentionedUser = msg.mentions.users.first() || client.users.get(args[0]);

    if(!args[1]) return msg.reply("")

    await client.db.execute(`UPDATE users SET balance = ${parseInt(args[1])} WHERE id = '${mentionedUser.id}'`);
};

module.exports.info = {
    admin: true
};