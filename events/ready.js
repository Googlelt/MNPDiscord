module.exports = (client) => {
    console.log(`Logged in as ${client.user.username}`);

    client.constructor.presence(client);

    client.cache = {
    	stats: {
    		commands: 0
    	},
        afk: []
    };
};