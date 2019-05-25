let booleans = ["true", "false"];

let isTrueOrFalse = (boolean) => {
    let isTrue;
    if(boolean === "true") isTrue = true;
    if(boolean === "false") isTrue = false;

    let result = isTrue ? 1 : 0;

    return result;
};

module.exports.run = async (client, msg, args) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) return;

    let user = msg.mentions.users.first();
    let channel = msg.mentions.channels.first();

    args.map(arg => {
        if(arg === "me") user = msg.author;
        if(arg === "this") channel = msg.channel;

        if(!user) {
            let possibleUser = client.users.get(arg);

            if (possibleUser) user = possibleUser;
        }

        if(!channel) {
            let possibleChannel = client.channels.get(arg);

            if(possibleChannel) channel = possibleChannel;
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
    }else if(args[0] === "welcome") {
        let json = JSON.parse((await client.db.query("SELECT * FROM SETTINGS where name = 'welcome'")).value);

        if(args[1] === "enabled") {
            if(!args[2]) return msg.reply("You must specify a boolean (true, false).");
            if(!booleans.includes(args[2])) return msg.reply("Invalid boolean.");

            json.enabled = args[2] === "true";
        }else if(args[1] === "channel") {
            if(!channel) return msg.reply("You must specify a channel.");

            json.channel = channel.id;
        }

        await client.db.execute(`UPDATE settings SET value = '${JSON.stringify(json)}' WHERE name = 'welcome'`);

        return msg.reply("Settings have been updated");
    }
};

module.exports.info = {
    admin: true
};