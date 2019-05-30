const { MessageEmbed } = require("discord.js");

module.exports.run = (client, msg) => {
    let commandsString = ``;

    client.commands.filter(command => !command.info.admin).map(command => {
        commandsString = `${commandsString}\n${client.config.prefix}${command.info.name}: ${command.info.description}`;
    });

    return msg.channel.send(new MessageEmbed()
    .setColor(client.config.color)
    .setDescription(commandsString));
};

module.exports.info = {
    description: "shows this message."
}