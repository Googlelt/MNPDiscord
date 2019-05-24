module.exports.run = async (client, msg, args) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) return;

    let user = msg.mentions.users.first();

    args.map(arg => {
        if(arg === "me") user = msg.author;

        if(!user) {
            let possibleUser = client.users.get(arg);

            if(possibleUser) user = possibleUser;
        }
    });

    if(args[0] === "balance") {
        if(!user) return msg.reply("You must specify a user.");

        if(!args[2]) return msg.reply(`You need to provide the new amount of ${client.config.economy.currencyName}.`);

        if(!Number(args[2])) return msg.reply("The amount must be a number.");

        await client.db.execute(`UPDATE users SET balance = '${parseInt(args[2])}' WHERE id = '${msg.author.id}'`);

        return msg.reply(`Balance has been updated`);
    }else if(args[0] === "resetdaily") {
        if(!user) return msg.reply("You must specify a user.");

        await client.db.execute(`UPDATE users SET lastDaily = '0' WHERE id = '${user.id}'`);

        return msg.reply("Daily has been reset");
    }
};

module.exports.info = {
    admin: true
};