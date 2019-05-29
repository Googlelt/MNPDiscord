module.exports = (client) => {
    console.log(`Logged in as ${client.user.username}`);

    client.constructor.presence(client);

    if(!client.guilds.get(client.config.guilds.currentGuild)) {
	    client.config.guilds.currentGuild = client.config.guilds.staff;
    };

    client.cache = {
    	stats: {
    		commands: 0
    	},
        afk: []
    };

    require("../modules/ban")(client);
};