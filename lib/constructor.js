module.exports = {
    permissions: (permission) => {
        return `You need the following permissions: ${permission}.`;
    },

    balanceMe: (client, msg, user, money) => {
        return client.createEmbed(msg.channel.id)
            .color(client.config.color)
            .description(`You have ${money} ${client.config.economy.currencyName}`)
            .author(user.username, user.avatarURL)
            .thumbnail(client.config.economy.currencyLogo)
            .send();
    },

    leaderboard: (client, msg, data) => {

    },

    ping: (client, msg, msg_1) => {
        return client.createEmbed(msg.channel.id)
            .color(client.config.color)
            .description(`Api: ${client.shards.get(0).latency}ms\nMessage: ${msg_1.timestamp - msg.timestamp}ms`)
            .send();
    },

    help: (client, msg, commandsString) => {
        return client.createEmbed(msg.channel.id)
            .color(client.config.color)
            .description(commandsString)
            .send();
    },

    presence: (client) => {
        if(client.config.development) return;
        return client.user.setPresence({
            activity: {
                name: `${client.config.prefix}help | ${client.users.size} members`
            }
        });
    }
};