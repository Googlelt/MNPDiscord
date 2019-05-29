const Discord = require("discord.js");
const fs = require("fs-nextra");

module.exports = async (client) => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();

    let files = (await fs.readdir("./commands")).filter(file => file.endsWith(".js"));

    if(files.length < 1) return console.log("No commands were loaded");

    files.map((file) =>{
        let command = require(`../commands/${file}`);

        // let commandInfo = command.info || {
        //     name: file.replace(".js", ""),
        //     description: "Unknown"
        // }

        let commandInfo = command.info || {};

        if(!commandInfo.admin) commandInfo.admin = false;
        if(!commandInfo.name) commandInfo.name = file.replace(".js", "");
        if(!commandInfo.description) commandInfo.description = "none";

        command.info = commandInfo;

        console.log(`${file} has been loaded`);

        if(commandInfo.aliases) {
            commandInfo.aliases.map(alias => {
                client.aliases.set(alias, commandInfo.name);
            });
        }

        client.commands.set(commandInfo.name, command);
    });
}