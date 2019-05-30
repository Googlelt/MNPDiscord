let modules = {
    userData: require("../modules/userData"),
    afk: require("../modules/afk")
};

module.exports = async (client, msg) => {
    if(msg.channel.type !== "text") return;
    if(msg.author.bot) return;
    
    let prefix = client.config.prefix;

    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);

    //userData

    console.time(`userData: ${msg.author.tag}`);
    let userData = await modules.userData.get(client, msg.author.id);
    console.timeEnd(`userData: ${msg.author.tag}`);
    /*
        afk
    */
    // if(client.config.development) {
    //     modules.afk(client, msg, userData);
    // }

    if(!msg.content.startsWith(prefix)) return;

    let cmdFile = client.commands.get(cmd.slice(prefix.length));

    if(!cmdFile) cmdFile = client.commands.get(client.aliases.get(cmd.slice(prefix.length)));

    if(cmdFile) {
        client.cache.stats.commands += 1;
        return cmdFile.run(client, msg, args);
    }

    // let alias = client.commands.get(cmd.slice(prefix.length));

    // if(alias) {
    //     let cmdFile = client.commands.get(cmd.slice(prefix.length));
    // }
};