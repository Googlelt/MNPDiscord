const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const dateFormat = require("dateformat");

module.exports = async (client, member) => {
    client.constructor.presence(client);
    
    let joinDiscord = moment(new Date()).diff(member.user.createdAt, 'days');
    let date = dateFormat(new Date(), 'mmm-dd-yyyy hh:MM:ss:L');

    if (joinDiscord < client.config.raid.weeks * 7) {
        member.send(`**You have been Banned for ${client.config.raid.weeks} Week** \nReason:**Account Age Under 3 weeks old**`).catch(error => console.log(`Couldnt Send DM, Probably because they have DM's Closed`));
        client.channels.get(client.config.channels.modlog).send(`\[${date}\] ${member} \(\`${member.id}\`\) has been banned for ${client.config.raid.weeks} week because their account was created \`${joinDiscord}\` days ago **(Less Than 3 Weeks)**`);
        return setTimeout(async () => {
            member.ban({
                days: 7,
                reason: `Account Under ${client.config.raid.weeks} Weeks Old`
            });

            await client.db.execute(`INSERT INTO bans VALUES ('${member.user.id}', '${Date.now()}')`);
            console.log(`${member.id}'s account was under 3 weeks and they have been banned for ${client.config.raid.weeks * 7} Days`)
        }, 1000);
    }

    // console.log(await client.db.query("SELECT * FROM SETTINGS where name = 'welcome'")));

    // let json = await client.db.query("SELECT * FROM SETTINGS where name = 'welcome'");

    // console.log(json);

    let json = JSON.parse((await client.db.query("SELECT * FROM settings where name = 'welcome'")).value);

    if(!json.enabled) return;
    let welcomeChannel = client.channels.get(json.channel);
    let msgContent;

    let firstMention = await client.channels.get(json.channel).send(`<@${member.user.id}>`);

    firstMention.delete();

    if (client.guilds.get(client.config.guilds.main).members.size === 30000) {
        client.channels.get(json.channel).send(`https://tenor.com/view/congrats-gif-10641964`)



        msgContent = `:tada: **30k MEMBERS** :tada:\nCongrats, <@${member.user.id}> on being the 30,000th member to join!\nWelcome to **Meet New People, <@${member.user.id}>!**\nGo start off in <#${client.config.channels.roles}> -- then head to <#${client.config.channels.roles}> and make sure you follow them!\nYou are the ${member.guild.members.size}th member to join!`;
    } else {
        msgContent = `:tada: \nWelcome to **Meet New People, <@${member.user.id}>!**\nGo start off in <#${client.config.channels.roles}> -- then head to <#${client.config.channels.rules}> and make sure you follow them!\nYou are the ${member.guild.members.size}th member to join!`;
    }

    const embed = new MessageEmbed()
        .setAuthor(`Welcome | ${member.user.username}`, member.guild.iconURL())
        .setColor(client.config.color)
        .setDescription(msgContent)
        .setThumbnail(member.user.displayAvatarURL())

    welcomeChannel.send(embed);
};