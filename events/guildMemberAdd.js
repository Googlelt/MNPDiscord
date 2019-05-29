const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = (client, member) => {
    client.constructor.presence(client);

    return;
    // let joinDiscord = moment(new Date()).diff(member.user.createdAt, 'days');
    // let date = dateFormat(new Date(), 'mmm-dd-yyyy hh:MM:ss:L');

    // if (joinDiscord < 30) {
    //     member.send("**You have been Banned for 1 Week** \nReason:**Account Age Under 4 weeks old**").catch(error => console.log(`Couldnt Send DM, Probably because they have DM's Closed`));
    //     client.channels.get(client.config.channels.modlog).send(`\[${date}\] ${member} \(\`${member.id}\`\) has been banned for 1 week because their account was created \`${joinDiscord}\` days ago **(Less Than ${client.config.raid.weeks} Weeks)**`);
    //     return setTimeout(async () => {
    //         member.ban({
    //             days: 7,
    //             reason: `Account Under ${client.config.raid.weeks} Weeks Old`
    //         });

    //         await client.db.execute(`INSERT INTO bans VALUES ('${member.user.id}', '${Date.now()}')`);
    //         console.log(`${member.id}'s account was under ${client.config.raid.weeks} weeks and they have been banned for 7 Days`)
    //     }, 1000);
    // }

    // let json = JSON.parse((await client.db.query("SELECT * FROM SETTINGS where name = 'welcome'")).value);


    // if(!json.enabled) return;

    // if (client.guilds.get(client.config.guilds.currentGuild).size === 30000) {
    //     client.channels.get(json.channel).send(`https://tenor.com/view/congrats-gif-10641964`)

    //     const embed = new Discord.MessageEmbed()
    //         .setAuthor(`Welcome | ${member.user.username}`, msg.guild.iconURL())
    //         .setColor(client.config.color)
    //         .setDescription(`:tada: **30k MEMBERS** :tada:\nCongrats, <@${member.user.id}> on being the 30,000th member to join!\nWelcome to **Meet New People, <@${member.user.id}>!**\nGo start off in <#${client.config.channels.roles}> -- then head to <#${client.config.channels.roles}> and make sure you follow them!\nYou are the ${member.guild.members.size}th member to join!`)
    //         .setThumbnail(member.user.displayAvatarURL())
    //     client.channels.get(welcomeChannel).send(embed);
    // } else {
    //     const embed = new Discord.MessageEmbed()
    //         .setAuthor(`Welcome | ${member.user.username}`, msg.guild.iconURL())
    //         .setColor(client.config.color)
    //         .setDescription(`:tada: **30k MEMBERS** :tada:\nCongrats, <@${member.user.id}> on being the 30,000th member to join!\nWelcome to **Meet New People, <@${member.user.id}>!**\nGo start off in <#${client.config.channels.roles}> -- then head to <#${client.config.channels.roles}> and make sure you follow them!\nYou are the ${member.guild.members.size}th member to join!`)
    //         .setThumbnail(member.user.displayAvatarURL())
    //     client.channels.get(welcomeChannel).send(embed);
    // }
};