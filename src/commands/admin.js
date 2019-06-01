const { exec } = require("child_process");
let booleans = ["true", "false"];

let isTrueOrFalse = (boolean) => {
    let isTrue;
    if(boolean === "true") isTrue = true;
    if(boolean === "false") isTrue = false;

    let result = isTrue ? 1 : 0;

    return result;
};

module.exports.run = async (client, msg, args) => {
    if(!client.config.whitelist.includes(msg.author.id)) return;
    try {
        let user = msg.mentions.users.first();
        let channel = msg.mentions.channels.first();

        args.map(arg => {
            if (arg === "me") user = msg.author;
            if (arg === "this") channel = msg.channel;

            if (!user) {
                let possibleUser = client.users.get(arg);

                if (possibleUser) user = possibleUser;
            }

            if (!channel) {
                let possibleChannel = client.channels.get(arg);

                if (possibleChannel) channel = possibleChannel;
            }
        });

        if (args[0] === "balance") {
            if (!user) return msg.reply("You must specify a user.");

            if (!args[2]) return msg.reply(`You need to provide the new amount of ${client.config.economy.currencyName}.`);

            if (!Number(args[2])) return msg.reply("The amount must be a number.");

            // await client.db.execute(`UPDATE users SET balance = '${parseInt(args[2])}' WHERE id = '${msg.author.id}'`);

            client.userData.update(client, user.id, {
                name: "balance",
                value: parseInt(args[2])
            });

            return msg.reply(`Balance has been updated`);
        } else if (args[0] === "resetdaily") {
            if (!user) return msg.reply("You must specify a user.");

            await client.db.execute(`UPDATE users SET lastDaily = '0' WHERE id = '${user.id}'`);

            return msg.reply("Daily has been reset");
        } else if (args[0] === "welcome") {
            let json = JSON.parse((await client.db.query("SELECT * FROM settings where name = 'welcome'")).value);

            if (args[1] === "enabled") {
                if (!args[2]) return msg.reply("You must specify a boolean (true, false).");
                if (!booleans.includes(args[2])) return msg.reply("Invalid boolean.");

                json.enabled = args[2] === "true";
            } else if (args[1] === "channel") {
                if (!channel) return msg.reply("You must specify a channel.");

                json.channel = channel.id;
            }

            await client.db.execute(`UPDATE settings SET value = '${JSON.stringify(json)}' WHERE name = 'welcome'`);

            return msg.reply("Settings have been updated");
        } else if (args[0] === "drop") {
            let json = JSON.parse((await client.db.query("SELECT * FROM settings where name = 'drop'")).value);

            if (args[1] === "enabled") {
                if (!args[2]) return msg.reply("You must specify a boolean (true, false).");
                if (!booleans.includes(args[2])) return msg.reply("Invalid boolean.");

                json.enabled = args[2] === "true";
            } else if (args[1] === "channel") {
                if (!channel) return msg.reply("You must specify a channel.");

                json.channel = channel.id;
            } else if (args[1] === "force") {
                return client.crates.force(client);
            }

            await client.db.execute(`UPDATE settings SET value = '${JSON.stringify(json)}' WHERE name = 'drop'`);

            return msg.reply("Settings have been updated");
        } else if (args[0] === "eval") {
            let evaled = await eval(args.slice(1).join(" "));

            msg.channel.send("```" + evaled + "```");
        } else if (args[0] === "pull") {
            exec(`cd ../ && git pull ${client.config.git}`, async () => {
                await msg.reply("Rebooting");

                process.exit();
            });
        } else if (args[0] === "sql") {
            let results = (await client.db.raw.query(args.slice(1).join(" ")))[0];

            msg.channel.send("```" + JSON.stringify(results) + "```");
        }
    }catch(err) {
        console.log(err);
    }
};

module.exports.info = {
    admin: true
};