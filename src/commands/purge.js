module.exports.run = (client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply(client.constructor.permissions("Manage Messages"));

    if(!args[0]) return msg.reply("You have to provide the amount of messages to purge.");

    if(!Number(args[0])) return msg.reply("Amount be a number.");

    if(args[0] > 100) return msg.reply("You are only able to purge 100 messages at a time.");

    msg.delete();

    return msg.channel.bulkDelete(args[0]);
}

module.exports.info = {
    admin: true
}